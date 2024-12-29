import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CarModule } from './car/car.module';
import { ParkingModule } from './parking/parking.module';
import { HistoricalModule } from './historical/historical.module';
import { ParkingCapacityModule } from './parking-capacity/parking-capacity.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, 
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
