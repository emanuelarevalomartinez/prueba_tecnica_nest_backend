import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid'

@Injectable()
export class ParkingService {

constructor(
  @InjectRepository(Parking)
  private readonly parkingRepository: Repository<Parking>,

  private readonly userService: UserService,
){

}


  async create( carNumber: number ,createParkingDto: CreateParkingDto) {


    const userExist = await this.userService.findUserByParam( { ["name"]: createParkingDto.nameUser } )

   if(userExist.cars[0] === undefined){
    throw new BadRequestException(` user does not have any car`)
 }

    if(!userExist.cars[carNumber - 1]){
       throw new BadRequestException(` user does not have ${carNumber} cars`)
    }

    
    const date = new Date();

    const dateMonthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })

    const time12Hours = date.toLocaleTimeString("en-US",{
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })


    const newParking:Parking = {
       idParking: uuid(),  
       idCar: userExist.cars[carNumber - 1].idCar,
       idUser: userExist.id,
       model: userExist.cars[carNumber - 1].model,
       make: userExist.cars[carNumber - 1].make,
       date: dateMonthYear,
       hour: time12Hours,
       nameUser: userExist.name,
    }
    
   const createNewParking = this.parkingRepository.create(newParking);

    await this.parkingRepository.save(createNewParking);

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
