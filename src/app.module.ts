import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CarModule } from './car/car.module';
import { ParkingModule } from './parking/parking.module';
import { HistoricalModule } from './historical/historical.module';
import { ParkingCapacityModule } from './parking-capacity/parking-capacity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost", 
      port: 5444,
      username: "enterprisedb",
      password: "4444",
      database: "prueba_tecnica_nest_backend",
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    CarModule,
    ParkingModule,
    HistoricalModule,
    ParkingCapacityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
