import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'

@Injectable()
export class CarService {

constructor(
  @InjectRepository(Car)
  private readonly carsRepository: Repository<Car>,
)
 { }


  async create(createCarDto: CreateCarDto): Promise<Car> {

    const newCar: Car = {
      idCar: uuid(),
      make: createCarDto.make,
      model: createCarDto.model,
      user: createCarDto.user,
    }

   const response = await this.carsRepository.save(newCar);

   if(!response){
      throw new BadRequestException("car not created");
   }

    return newCar;
  }

  async findByMakeAndModel(make: string, model: string): Promise<string>{
     const searchCar = await this.carsRepository.findOne({
        where: {
          make: make,
          model: model,
        }
      })
      if(!searchCar){
        throw new NotFoundException(`Car not found`);
      }
      return searchCar.idCar;
  }

  // findAll() {
  //   return `This action returns all car`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} car`;
  // }

  // update(id: number, updateCarDto: UpdateCarDto) {
  //   return `This action updates a #${id} car`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} car`;
  // }
}
