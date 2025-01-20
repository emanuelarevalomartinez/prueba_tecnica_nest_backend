import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './entities/car.entity';
import { CarResponseCreated, CarSuccesfulDeleted, GetAllCarsResponse, GetOneCarResponse } from './dto/car-response.dto';
import { CarCreateBadResponse, CarGenericBadResponse } from './dto/car-bad-response.dto';
import { Roles } from 'src/user/enums/roles';
import { Autentication } from 'src/user/decorators/auentication';

@ApiTags("Car")
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService
  ) {}


  @Post()
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiResponse( { status: 200, description: "Create new car", type: CarResponseCreated } )
  @ApiResponse( { status: 500, description: "Error creating new Car", type: CarCreateBadResponse } )
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'page', 
    required: false, 
    description: 'Page to show', 
  }) 
  @ApiParam({ 
    name: 'limit', 
    required: false, 
    description: 'Limit of cars to see', 
  })
  @ApiResponse( { status: 201, description: "Find all cars", type: GetAllCarsResponse } )
  @ApiResponse( { status: 401, description: "Error searching all cars", type: CarGenericBadResponse } )
  findAll(
    @Query("page") page:string,
    @Query("limit") limit:string,
  ){
     return this.carService.findAllCars(page, limit);
  }

  @Get(":idCar")
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idCar', 
    required: true, 
    description: 'Car id', 
  }) 
  @ApiResponse( { status: 201, description: "Find Car with id", type: GetOneCarResponse } )
  @ApiResponse( { status: 400, description: "Error searching Car by id", type: CarGenericBadResponse } )
  findOne(
    @Param("idCar") idCar: string,
  ){
     return this.carService.findOne(idCar);
  }

  @Patch(":idCar")
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idCar', 
    required: true, 
    description: 'Car id', 
  }) 
  @ApiResponse( { status: 401, description: "Error updating car by id", type: CarGenericBadResponse } )
  updateCar(
    @Param("idCar") idCcar:string,
    @Body() updatecarDto:UpdateCarDto,
  ){
     return this.carService.updateCar(idCcar, updatecarDto);
  }

   @Delete(':idCar')
   @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
   @ApiBearerAuth('access-token') 
   @ApiParam({ 
    name: 'idCar', 
    required: true, 
    description: 'Car id', 
  }) 
  @ApiResponse( { status: 201, description: "Cars with that id were delete", type: CarSuccesfulDeleted } )
   @ApiResponse( { status: 401, description: "Error deleting Car by id", type: CarGenericBadResponse } )
  remove(@Param('idCar') idCar: string) {
    return this.carService.remove(idCar);
  }
}
