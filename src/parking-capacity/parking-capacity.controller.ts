import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { CreateParkingCapacityDto } from './dto/create-parking-capacity.dto';
import { UpdateParkingCapacityDto } from './dto/update-parking-capacity.dto';

@Controller('parking-capacity')
export class ParkingCapacityController {
  constructor(private readonly parkingCapacityService: ParkingCapacityService) {}

  @Patch(":newCapacity")
  updateCapacity( @Param("newCapacity") newCapacity: string){
     const capacityNumber = Number(newCapacity);
     return this.parkingCapacityService.updateParkingCapacity(capacityNumber);
  }

  @Get()
  getAllParkingCapacity(){
    return this.parkingCapacityService.getParkingCapacity();
  }


}
