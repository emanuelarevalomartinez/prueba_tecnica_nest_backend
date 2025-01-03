import { Injectable } from '@nestjs/common';
import { CreateParkingCapacityDto } from './dto/create-parking-capacity.dto';
import { UpdateParkingCapacityDto } from './dto/update-parking-capacity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingCapacity } from './entities/parking-capacity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingCapacityService {


  constructor(
    @InjectRepository(ParkingCapacity)
    private readonly parkingCapacityRepository: Repository<ParkingCapacity>,
  ){

  }

  async updateParkingCapacity(newcapacity: number){
        const curretCapacity = await this.parkingCapacityRepository.findOne({
         where: {
          typeCount: "capacity"
         },
        });

        if(curretCapacity.typeCount == null){
            await this.parkingCapacityRepository.save({
              typeCount: "capacity",
              capacityParking: newcapacity,
            })
        }

        await this.parkingCapacityRepository.save({
          typeCount: "capacity",
          capacityParking: newcapacity,
        })

  }


  async getParkingCapacity() {
      const cant: ParkingCapacity[] = await this.parkingCapacityRepository.find({
        take: 1,
      });

      return cant[0].capacityParking;
  }

  // create(createParkingCapacityDto: CreateParkingCapacityDto) {
  //   return 'This action adds a new parkingCapacity';
  // }

  // findAll() {
  //   return `This action returns all parkingCapacity`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} parkingCapacity`;
  // }

  // update(id: number, updateParkingCapacityDto: UpdateParkingCapacityDto) {
  //   return `This action updates a #${id} parkingCapacity`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} parkingCapacity`;
  // }
}
