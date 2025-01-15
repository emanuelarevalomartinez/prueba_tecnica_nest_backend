import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './entities/car.entity';

@ApiTags("Car")
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService
  ) {}


  @Post()
  @ApiResponse( { status: 200, description: "Create new car", type: Car } )
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

  @Patch(":idCar")
  updateCar(
    @Param("idCar") idCcar:string,
    @Body() updatecarDto:UpdateCarDto,
  ){
     return this.carService.updateCar(idCcar, updatecarDto);
  }

   @Delete(':idCar')
  remove(@Param('idCar') idCar: string) {
    return this.carService.remove(idCar);
  }
}
