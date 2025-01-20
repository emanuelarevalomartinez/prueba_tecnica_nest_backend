import { Module } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { ParkingCapacityController } from './parking-capacity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingCapacity } from './entities/parking-capacity.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingCapacity]),
    UserModule,
  ],
  controllers: [ParkingCapacityController],
  providers: [ParkingCapacityService],
  exports: [ParkingCapacityService],
})
export class ParkingCapacityModule {}
