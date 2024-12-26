import { Module } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { ParkingCapacityController } from './parking-capacity.controller';

@Module({
  controllers: [ParkingCapacityController],
  providers: [ParkingCapacityService],
})
export class ParkingCapacityModule {}
