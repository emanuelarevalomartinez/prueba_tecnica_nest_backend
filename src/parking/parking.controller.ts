import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post(':car')
  create(
    @Param('car') car: string,
    @Body() createParkingDto: CreateParkingDto,
  ) {
    const numberCar = Number(car);
    return this.parkingService.create(numberCar, createParkingDto);
  }

  @Get()
  finAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.parkingService.findAll(page, limit);
  }

  @Get(":idParking")
  finOnParking(
    @Param("idParking") idParking:string,
  ){
    return this.parkingService.findOneParking(idParking);
  }

  @Delete(':idParking')
  remove(@Param('idParking') idParking: string) {
    return this.parkingService.remove(idParking);
  }
}
