import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid'
import { CreateParkingInterface } from './interfaces/parking.interfaces';
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
){

}


  async create( carNumber: number ,createParkingDto: CreateParkingDto): Promise<CreateParkingInterface> {


    if( createParkingDto.positionParking < 1 ){
      throw new BadRequestException("Parking position is not valid");
    }


    const userExist = await this.userService.findUserByParam( { ["name"]: createParkingDto.nameUser } )

   if(userExist.cars[0] === undefined){
    throw new BadRequestException(` user does not have any car`)
 }

    if(!userExist.cars[carNumber - 1]){
       throw new BadRequestException(` user does not have ${carNumber} cars`)
    }

    const dateInit = new Date(createParkingDto.dateInit);
    const dateEnd = new Date(createParkingDto.dateEnd);

    if(dateInit >= dateEnd ){
       throw new BadRequestException("Date init can not be greater that date end");
    }


    const newParking:Parking = {
       idParking: uuid(),  
       idCar: userExist.cars[carNumber - 1].idCar,
       idUser: userExist.id,
       model: userExist.cars[carNumber - 1].model,
       make: userExist.cars[carNumber - 1].make,
       dateInit: dateInit,
       dateEnd: dateEnd,
       nameUser: userExist.name,
       parkingPosition: await this.parkingPositionAsignate(createParkingDto.positionParking),
    }
    
   const createNewParking = this.parkingRepository.create(newParking);

  const totalCars = await this.totalCarsOnParking();
  const totalCapacity= await this.parkingCapacityService.getParkingCapacity();

   if(totalCars + 1 > totalCapacity ){
        throw new BadRequestException("There are not more capacity on the parking");
   } else {

    const posibbleParkigTime = await this.findSameReservationTime(newParking.dateInit, newParking.dateEnd, createParkingDto.positionParking);

    if(!posibbleParkigTime){
         throw new BadRequestException(" Parking time intervale not posibble to assingn");
    } else {

      await this.historicalService.create({
        activity: `Reservation Parking`,
        idUser: createNewParking.idUser,
        idCar: createNewParking.idParking,
      })
      await this.parkingRepository.save(createNewParking);

      return {
        idParking: createNewParking.idParking,
        idUser: createNewParking.idUser,
        idCar: createNewParking.idCar,
        nameUser: createNewParking.nameUser,
        make: createNewParking.make,
        model: createNewParking.model,
        dateInit: createNewParking.dateInit,
        dateEnd: createNewParking.dateEnd,
        parkingPosition: createNewParking.parkingPosition,
      }
    }
   }
  }

  async totalCarsOnParking() {
    const cant = await this.parkingRepository.count();
    return cant;
  }

  async parkingPositionAsignate(positionParking: number): Promise<number>{

    let maxValue: number = await this.parkingCapacityService.getParkingCapacity();

    if(positionParking > maxValue){
       throw new BadRequestException("Parking position is not available");
    }
    return positionParking;
  }

  async findSameReservationTime(startDate:Date, endDate:Date, parkingPosition: number){
    // estilo: 2025-01-03 01:08:28
   
     const response = await this.parkingRepository
        .createQueryBuilder('parking')
        .select([
          "to_char(parking.dateInit, 'YYYY-MM-DD HH24:MI:SS') AS dateinit",
          "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
        ])
       .where("parking.dateInit <= :endDate", { endDate })
        .andWhere("parking.dateEnd >= :startDate", { startDate })
        .andWhere("parking.parkingPosition = :parkingPosition", { parkingPosition })
        .getRawMany()

        if(!response){
           throw new BadRequestException(" Parking intervale time not found ");
        }
        return response.length == 0;
  }

  async findAll(page: number, limit: number){

    const consultPage = page !== undefined ? Number(page) : 1;
    const consultLimit = limit !== undefined ? Number(limit) : 5;
    const skip = ( consultPage - 1 ) * consultLimit;

    return await this.parkingRepository
    .createQueryBuilder('parking')
        .select([
          "parking.idParking as idparking",
          "parking.idUser as idpser",
          "parking.idCar as idcar",
          "parking.nameUser as nameuser",
          "parking.make as make",
          "parking.model as model",
          "parking.parkingPosition as parkingposition",
          "to_char(parking.dateInit, 'YYYY-MM-DD HH24:MI:SS') AS dateinit",
          "to_char(parking.dateEnd, 'YYYY-MM-DD HH24:MI:SS') AS dateend",
        ])
        .orderBy("parking.parkingPosition", 'ASC')
        .take( consultLimit )  
        .skip( skip )
        .getRawMany();
  }

  async findOneParking(idParking: string): Promise<Parking> {
     const response = await this.parkingRepository.findOne( {
      where: { idParking: idParking }
     } )

     if(!response){
       throw new NotFoundException(` Parking with id ${idParking} not found `)
     }

     return response;
  }

  async remove(idParking: string): Promise<string> {

    const response = await this.findOneParking(idParking);

     await this.historicalService.create({
      idCar: response.idCar,
      activity: "Cancel Parking", 
      idUser: response.idUser,
      })
    await this.parkingRepository.delete( idParking );

      

      return "Parking reservation deleted successful"
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} parking`;
  // }

  // update(id: number, updateParkingDto: UpdateParkingDto) {
  //   return `This action updates a #${id} parking`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} parking`;
  // }
}
