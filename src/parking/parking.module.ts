import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { UserModule } from 'src/user/user.module';
import { ParkingCapacityModule } from 'src/parking-capacity/parking-capacity.module';
import { HistoricalModule } from 'src/historical/historical.module';

@Module({
  imports: [
    HistoricalModule,
    UserModule,
    ParkingCapacityModule,
    TypeOrmModule.forFeature([Parking]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
