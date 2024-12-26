import { Injectable } from '@nestjs/common';
import { CreateParkingCapacityDto } from './dto/create-parking-capacity.dto';
import { UpdateParkingCapacityDto } from './dto/update-parking-capacity.dto';

@Injectable()
export class ParkingCapacityService {
  create(createParkingCapacityDto: CreateParkingCapacityDto) {
    return 'This action adds a new parkingCapacity';
  }

  findAll() {
    return `This action returns all parkingCapacity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingCapacity`;
  }

  update(id: number, updateParkingCapacityDto: UpdateParkingCapacityDto) {
    return `This action updates a #${id} parkingCapacity`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingCapacity`;
  }
}
