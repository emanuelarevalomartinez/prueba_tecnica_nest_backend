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
  ) {}

  async updateParkingCapacity(newcapacity: number): Promise<number> {
    const curretCapacity = await this.parkingCapacityRepository.findOne({
      where: {
        typeCount: 'capacity',
      },
    });

    if (!curretCapacity) {
      const response = await this.parkingCapacityRepository.save({
        typeCount: 'capacity',
        capacityParking: newcapacity,
      });
      return response.capacityParking;
    }

    const response = await this.parkingCapacityRepository.save({
      typeCount: 'capacity',
      capacityParking: newcapacity,
    });

    return response.capacityParking;
  }

  async getParkingCapacity(): Promise<number> {
    let capacity: ParkingCapacity[] = await this.parkingCapacityRepository.find(
      {
        take: 1,
      },
    );

    if (capacity.length == 0) {
      let currentCapacity = await this.updateParkingCapacity(10);
      return currentCapacity;
    }
    return capacity[0].capacityParking;
  }
}
