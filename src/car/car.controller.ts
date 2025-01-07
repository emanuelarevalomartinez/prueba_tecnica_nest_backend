import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService
  ) {}


  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(
    @Query("page") page:string,
    @Query("limit") limit:string,
  ){
     return this.carService.findAllCars(page, limit);
  }

  @Get(":idCar")
  findOne(
    @Param("idCar") idCar: string,
  ){
     return this.carService.findOne(idCar);
  }

   @Delete(':idCar')
  remove(@Param('idCar') idCar: string) {
    return this.carService.remove(idCar);
  }
}
