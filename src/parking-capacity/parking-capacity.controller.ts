import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { CreateParkingCapacityDto } from './dto/create-parking-capacity.dto';
import { UpdateParkingCapacityDto } from './dto/update-parking-capacity.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Autentication } from 'src/user/decorators/auentication';
import { Roles } from 'src/user/enums/roles';
import { ParkingCapacityGetResponse, ParkingCapacityUpdateResponse } from './dto/parking-capacity-response';
import { ParkingCapacityGenericBadResponse } from './dto/parking-capacity-bad-response';

@ApiTags("Parking Capacity")
@Controller('parking-capacity')
export class ParkingCapacityController {
  constructor(private readonly parkingCapacityService: ParkingCapacityService) {}

  @Patch(":newCapacity")
  @Autentication( Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'newCapacity', 
    required: true, 
    description: 'Number for Driver Parking new capacity', 
  }) 
  @ApiResponse( { status: 201, description: "Update new Parking Capacity", type: ParkingCapacityUpdateResponse } )
  @ApiResponse( { status: 500, description: "Error to update new Parking Capacity", type: ParkingCapacityGenericBadResponse } )
  updateCapacity( @Param("newCapacity") newCapacity: string){
     const capacityNumber = Number(newCapacity);
     return this.parkingCapacityService.updateParkingCapacity(capacityNumber);
  }

  @Get()
  @Autentication( Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiResponse( { status: 201, description: "Get current Parking Capacity", type: ParkingCapacityGetResponse } )
  @ApiResponse( { status: 500, description: "Error to get current Parking Capacity", type: ParkingCapacityGenericBadResponse } )
  getAllParkingCapacity(){
    return this.parkingCapacityService.getParkingCapacity();
  }


}
