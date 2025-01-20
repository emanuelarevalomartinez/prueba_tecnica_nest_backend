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
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Autentication } from 'src/user/decorators/auentication';
import { Roles } from 'src/user/enums/roles';
import { CreateParkingResponse, GetAllParkingResponse, GetOneParkingResponse, ParkingSuccesfulDeleted, UpdateParkingResponse } from './dto/parking-response';
import { ParkingGenericBadResponse, ParkingUpdateBadResponse } from './dto/parking-bad-response';

@ApiTags("Parking")
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post(':car')
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'car', 
    required: true, 
    description: 'Car [ array position ] of the User cars', 
  }) 
  @ApiResponse( { status: 201, description: "Parking was created", type: CreateParkingResponse } )
  @ApiResponse( { status: 401, description: "Parking was not create", type: ParkingGenericBadResponse } )
  create(
    @Param('car') car: string,
    @Body() createParkingDto: CreateParkingDto,
  ) {
    const numberCar = Number(car);
    return this.parkingService.create(numberCar, createParkingDto);
  }

  @Get()
  @Autentication( Roles.EMPLOYEE, Roles.ADMIN )
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
  @ApiResponse( { status: 201, description: "Find all Parkings", type: GetAllParkingResponse } )
  @ApiResponse( { status: 401, description: "Can not find all parkings", type: ParkingGenericBadResponse } )
  finAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.parkingService.findAll(page, limit);
  }

  @Get(":idParking")
  @Autentication( Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idParking', 
    required: true, 
    description: 'Element to find the parking', 
  }) 
  @ApiResponse( { status: 201, description: "Find Parking by id", type: GetOneParkingResponse } )
  @ApiResponse( { status: 401, description: "Can not find parking by id", type: ParkingGenericBadResponse } )
  finOnParking(
    @Param("idParking") idParking:string,
  ){
    return this.parkingService.findOneParking(idParking);
  }

  @Patch(":idParking")
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idParking', 
    required: true, 
    description: 'Element to update the parking', 
  }) 
  @ApiResponse( { status: 201, description: "Update Parking by id", type: UpdateParkingResponse } )
  @ApiResponse( { status: 400, description: "You have not provide all the necesary data", type: ParkingUpdateBadResponse } )
  @ApiResponse( { status: 401, description: "Can not Update parking by id", type: ParkingGenericBadResponse } )
  update(
    @Param("idParking") idParking:string,
    @Body() updateParkingDto: UpdateParkingDto,
  ){
    return this.parkingService.updateParking(idParking,updateParkingDto);
  }

  @Delete(':idParking')
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idParking', 
    required: true, 
    description: 'Element to delete the parking', 
  }) 
  @ApiResponse( { status: 201, description: "Parking successful delete", type: ParkingSuccesfulDeleted } )
  @ApiResponse( { status: 401, description: "Can not Update parking by id", type: ParkingGenericBadResponse } )
  remove(@Param('idParking') idParking: string) {
    return this.parkingService.remove(idParking);
  }
}
