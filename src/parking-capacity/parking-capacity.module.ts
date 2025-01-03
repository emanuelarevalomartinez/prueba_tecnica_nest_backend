import { Module } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { ParkingCapacityController } from './parking-capacity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingCapacity } from './entities/parking-capacity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingCapacity])
  ],
  controllers: [ParkingCapacityController],
  providers: [ParkingCapacityService],
  exports: [ParkingCapacityService],
})
export class ParkingCapacityModule {}
