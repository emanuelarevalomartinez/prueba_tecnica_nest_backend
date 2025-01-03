import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid'
import { CreateParkingInterface } from './interfaces/parking.interfaces';
import { ParkingCapacityService } from 'src/parking-capacity/parking-capacity.service';

@Injectable()
export class ParkingService {

constructor(
  @InjectRepository(Parking)
  private readonly parkingRepository: Repository<Parking>,

  private readonly userService: UserService,

  private readonly parkingCapacityService: ParkingCapacityService,
){

}


  async create( carNumber: number ,createParkingDto: CreateParkingDto): Promise<CreateParkingInterface> {


    const userExist = await this.userService.findUserByParam( { ["name"]: createParkingDto.nameUser } )

   if(userExist.cars[0] === undefined){
    throw new BadRequestException(` user does not have any car`)
 }

    if(!userExist.cars[carNumber - 1]){
       throw new BadRequestException(` user does not have ${carNumber} cars`)
    }

    
    const date = new Date();

    // const dateMonthYear = date.toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // })

    // const time12Hours = date.toLocaleTimeString("en-US",{
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: true,
    // })


    const newParking:Parking = {
       idParking: uuid(),  
       idCar: userExist.cars[carNumber - 1].idCar,
       idUser: userExist.id,
       model: userExist.cars[carNumber - 1].model,
       make: userExist.cars[carNumber - 1].make,
       date: new Date(),
       nameUser: userExist.name,
    }
    
   const createNewParking = this.parkingRepository.create(newParking);

  // console.log("capacity ",await this.parkingCapacityService.getParkingCapacity());

  const totalCars = await this.totalCarsOnParking();
  const totalCapacity= await this.parkingCapacityService.getParkingCapacity();

  //TODO: tengo que hacer cumplir la ultima condicion
  //? hacer que se verifique que hay tiempo disponible antes de reservar y un intervalo de tiempo

//   const findUser = await this.userRepository
//   .createQueryBuilder('user')
//   .leftJoinAndSelect('user.cars', 'car')
//   .select([
//     'user.id AS id',
//     'user.name AS name',
//     'user.email AS email',
//     "to_char(user.date, 'YYYY-MM-DD HH24:MI:SS') AS formatteddate", // Formatear la fecha
//     'user.roles AS roles',  
//     'car.idCar AS cars',
//     'car.make AS make',
//     'car.model AS model',
//   ])
//   .where(`user.${key} = :value`, { value })
//   .getRawMany(); 

// if (!findUser || findUser.length === 0) {
//   throw new NotFoundException(`User with ${JSON.stringify(param)} not found`);
// }
// // console.log("findUser",findUser);

// const allCarsFormTheUser: userCarsModelInterface[] = findUser
// .filter((userCars: User) => userCars.cars)
// .map((userCarsExist: ReturnUserCarsInterface) => ({
//   id: userCarsExist.cars,
//   make: userCarsExist.make,
//   model: userCarsExist.model,
// }));

// const formattedUser: GetOneUserInterface = {
//   id: findUser[0].id,
//   name: findUser[0].name,
//   email: findUser[0].email,
//   date: findUser[0].formatteddate,
//   roles: findUser[0].roles ? findUser[0].roles.split(',') : [],
//   cars: allCarsFormTheUser,
// };

  // const ee = await this.parkingRepository.find({
  //   where: {
  //     date: dateMonthYear,
  //   }
  // })

  // console.log(ee);
  

   if(totalCars + 1 > totalCapacity ){
        throw new BadRequestException("There are not more capacity on the parking");
        
   } else {

    await this.parkingRepository.save(createNewParking);

    return {
      idParking: createNewParking.idParking,
      nameUser: createNewParking.nameUser,
      make: createNewParking.make,
      model: createNewParking.model,
      date: createNewParking.date,
    }
   }
   

    

    

  }

  async totalCarsOnParking() {
    const cant = await this.parkingRepository.count();
    return cant;
  }

  async findSameReservationTime(year:string, hour:string){
     const response = await this.parkingRepository
        .createQueryBuilder('parking')
        .select([
          "to_char(parking.date, 'YYYY-MM-DD HH24:MI:SS') AS date"
        ])
        .getRawMany()

        console.log(response);
        console.log(response[0].date);
        

        let dates: string[] = [];

        // dates[0] = response[0].date  


        //  response.forEach(reservation => {
        //     dates[reservation] = response[reservation].date
        //  });

        for (let index = 0; index < response.length; index++) {
          dates[index] = response[index].date
          
        }

        //* aqui estan los datos en bruto de todas la fechas de parking hechas en el sistema hay que manejarlas
        console.log(dates);
        
        
  }

  async hola(){
    return this.findSameReservationTime("2024/01/2023", "22")
  }

  // findAll() {
  //   return `This action returns all parking`;
  // }

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
