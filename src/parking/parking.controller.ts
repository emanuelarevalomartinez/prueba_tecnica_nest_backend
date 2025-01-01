import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}


  

  @Post(":car")
  create(
    @Param("car") car: string,
    @Body() createParkingDto: CreateParkingDto,
  ) {
    const numberCar = Number(car);
    return this.parkingService.create(numberCar,createParkingDto);
  }

  // @Get()
  // findAll() {
  //   return this.parkingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
  //   return this.parkingService.update(+id, updateParkingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingService.remove(+id);
  // }
}
