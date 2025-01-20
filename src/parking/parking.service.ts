import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
import {
  CreateParkingInterface,
  GetOneParkingInterface,
} from './interfaces/parking.interfaces';
import { ParkingCapacityService } from 'src/parking-capacity/parking-capacity.service';
import { HistoricalService } from 'src/historical/historical.service';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,

    private readonly userService: UserService,

    private readonly parkingCapacityService: ParkingCapacityService,

    private readonly historicalService: HistoricalService,
  ) {}

  async create(
    carNumber: number,
    createParkingDto: CreateParkingDto,
  ): Promise<CreateParkingInterface> {
    if (createParkingDto.positionParking < 1) {
      throw new BadRequestException('Parking position is not valid');
    }

    const userExist = await this.userService.findUserByParam({
      ['name']: createParkingDto.nameUser,
    });

    if (userExist.cars[0] === undefined) {
      throw new BadRequestException(` user does not have any car`);
    }

    if (!userExist.cars[carNumber - 1]) {
      throw new BadRequestException(` user does not have ${carNumber} cars`);
    }

    const dateInit = new Date(createParkingDto.dateInit);
    const dateEnd = new Date(createParkingDto.dateEnd);

    if (dateInit < new Date()) {
      throw new BadRequestException('Date initial can not be in the past ');
    }

    if (dateInit >= dateEnd) {
      throw new BadRequestException(
        'Date initial can not be greater that date end time',
      );
    }

    const newParking: Parking = {
      id_parking: uuid(),
      id_car: userExist.cars[carNumber - 1].idCar,
      //  idUser: userExist.id,
      user: userExist,
      model: userExist.cars[carNumber - 1].model,
      make: userExist.cars[carNumber - 1].make,
      dateInit: dateInit,
      dateEnd: dateEnd,
      nameUser: userExist.name,
      parkingPosition: await this.parkingPositionAsignate(
        createParkingDto.positionParking,
      ),
    };

    const createNewParking = this.parkingRepository.create(newParking);

    const totalCars = await this.totalCarsOnParking();
    const totalCapacity =
      await this.parkingCapacityService.getParkingCapacity();

    if (totalCars + 1 > totalCapacity) {
      throw new BadRequestException(
        'There are not more capacity on the parking',
      );
    } else {
      await this.completeAllPastReservations(new Date());

      const posibbleParkigTime = await this.findSameReservationTime(
        newParking.dateInit,
        newParking.dateEnd,
        createParkingDto.positionParking,
      );

      if (!posibbleParkigTime) {
        throw new BadRequestException(
          ' Parking time intervale not posibble to assingn',
        );
      } else {
        await this.historicalService.create({
          activity: `Reservation Parking`,
          idUser: createNewParking.user.id,
          idCar: createNewParking.user.cars[carNumber - 1].idCar,
        });

        await this.parkingRepository.save(createNewParking);

        return {
          idParking: createNewParking.id_parking,
          idUser: createNewParking.user.id,
          idCar: createNewParking.user.cars[carNumber - 1].idCar,
          nameUser: createNewParking.nameUser,
          make: createNewParking.make,
          model: createNewParking.model,
          dateinit: createNewParking.dateInit,
          dateend: createNewParking.dateEnd,
          parkingposition: createNewParking.parkingPosition,
        };
      }
    }
  }

  async totalCarsOnParking() {
    const cant = await this.parkingRepository.count();
    return cant;
  }

  async parkingPositionAsignate(positionParking: number): Promise<number> {
    let maxValue: number =
      await this.parkingCapacityService.getParkingCapacity();

    if (positionParking > maxValue) {
      throw new BadRequestException('Parking position is not available');
    }
    return positionParking;
  }

  async findSameReservationTime(
    startDate: Date,
    endDate: Date,
    parkingPosition: number,
  ) {
    // estilo: 2025-01-03 01:08:28

    const response = await this.parkingRepository
      .createQueryBuilder('parking')
      .select([
        "to_char(parking.dateInit, 'YYYY-MM-DD HH24:MI:SS') AS dateinit",
        "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
      ])
      .where('parking.dateInit <= :endDate', { endDate })
      .andWhere('parking.dateEnd >= :startDate', { startDate })
      .andWhere('parking.parkingPosition = :parkingPosition', {
        parkingPosition,
      })
      .getRawMany();

    if (!response) {
      throw new BadRequestException(' Parking intervale time not found ');
    }
    return response.length == 0;
  }

  async completeAllPastReservations(referentDate: Date) {
    const response: Parking[] = await this.parkingRepository
      .createQueryBuilder('parking')
      .select([
        "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
        'parking.id_parking as id_parking',
      ])
      .where(' parking.dateEnd <= :referentDate ', { referentDate })
      .getRawMany();

    response.forEach(async (parking) => {
      await this.remove(parking.id_parking, 'Finish Reservation');
    });
  }

  async findAll(page: number, limit: number) {
    const consultPage = page !== undefined ? Number(page) : 1;
    const consultLimit = limit !== undefined ? Number(limit) : 5;
    const skip = (consultPage - 1) * consultLimit;

    const response = await this.parkingRepository
      .createQueryBuilder('parking')
      .select([
        'parking.id_parking as id_parking',
        // "parking.idUser as idpser",
        // "parking.idCar as idcar",
        'parking.nameUser as nameuser',
        'parking.make as make',
        'parking.model as model',
        'parking.parkingPosition as parkingposition',
        "to_char(parking.dateInit, 'YYYY-MM-DD HH24:MI:SS') AS dateinit",
        "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
      ])
      //  .innerJoinAndSelect("parking.user", "user")
      .orderBy('parking.parkingPosition', 'ASC')
      .take(consultLimit)
      .skip(skip)
      .getRawMany();

    return response;
  }

  async updateParking(idParking: string, updateParkingDto: UpdateParkingDto) {

    const findParking = await this.findOneParking(idParking);

    let newParking = {
      id_parking: findParking.id_parking,
      dateEnd: null,
      dateInit: null,
      id_car: findParking.id_car,
      make: findParking.make,
      model: findParking.model,
      nameUser: findParking.nameuser,
      parkingPosition: findParking.parkingposition,
   }
    if (
      !updateParkingDto.dateInit ||
      !updateParkingDto.dateEnd ||
      !updateParkingDto.positionParking
    ) {
      throw new BadRequestException(
        'Some data is not defines, new Init Date, new End Date or new Parking position',
      );
    } else {

      const dateInit = new Date(updateParkingDto.dateInit);
    const dateEnd = new Date(updateParkingDto.dateEnd);

      const isPosibbleNewParkingTimeIntervale =
      await this.findSameReservationTime(
        dateInit,
        dateEnd,
        updateParkingDto.positionParking,
      );

      if (isPosibbleNewParkingTimeIntervale) {
        newParking.dateInit = dateInit;
        newParking.dateEnd = dateEnd;
        newParking.parkingPosition = updateParkingDto.positionParking;
      } else {
        throw new BadRequestException(
          'Time intervale in that parking position is not possible to asignate',
        );
      }

    const updateParking = await this.parkingRepository.save(newParking);

    return updateParking;
    }

    
  }

  async findOneParking(idParking: string): Promise<GetOneParkingInterface> {
    const response: GetOneParkingInterface = await this.parkingRepository
      .createQueryBuilder('parking')
      .select([
        'parking.id_parking as id_parking',
        'parking.id_car as id_car',
        'parking.userId as userid',
        'parking.nameUser as nameuser',
        'parking.make as make',
        'parking.model as model',
        'parking.parkingPosition as parkingposition',
        "to_char(parking.dateInit, 'YYYY-MM-DD HH24:MI:SS') AS dateinit",
        "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
      ])

      .where('parking.id_parking = :idParking', { idParking })
      .getRawOne();

    if (!response) {
      throw new NotFoundException(` Parking with id ${idParking} not found `);
    }

    return {
      id_parking: response.id_parking,
      id_car: response.id_car,
      userid: response.userid,
      nameuser: response.nameuser,
      make: response.make,
      model: response.model,
      parkingposition: response.parkingposition,
      dateinit: response.dateinit,
      dateend: response.dateend,
    };
  }

  async remove(
    idParking: string,
    reason: string = 'Cancel Parking',
  ): Promise<string> {
    const response = await this.findOneParking(idParking);

    await this.historicalService.create({
      idCar: response.id_car,
      activity: reason,
      idUser: response.userid,
    });
    await this.parkingRepository.delete(idParking);

    return 'Parking reservation deleted successful';
  }
}
