import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingCapacityService } from './parking-capacity.service';
import { CreateParkingCapacityDto } from './dto/create-parking-capacity.dto';
import { UpdateParkingCapacityDto } from './dto/update-parking-capacity.dto';

@Controller('parking-capacity')
export class ParkingCapacityController {
  constructor(private readonly parkingCapacityService: ParkingCapacityService) {}

  @Post()
  create(@Body() createParkingCapacityDto: CreateParkingCapacityDto) {
    return this.parkingCapacityService.create(createParkingCapacityDto);
  }

  @Get()
  findAll() {
    return this.parkingCapacityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingCapacityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingCapacityDto: UpdateParkingCapacityDto) {
    return this.parkingCapacityService.update(+id, updateParkingCapacityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingCapacityService.remove(+id);
  }
}
