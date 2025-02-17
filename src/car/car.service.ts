import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar: Car = {
      idCar: uuid(),
      make: createCarDto.make,
      model: createCarDto.model,
      user: createCarDto.user,
    };

    const response = await this.carsRepository.save(newCar);

    if (!response) {
      throw new BadRequestException('car not created');
    }

    return newCar;
  }

 async updateCar(idCar: string, updateCarDto: UpdateCarDto){
  const updateCar: Car = await this.carsRepository.findOne({ where: { idCar: idCar } });

  if(!updateCar){
     throw new NotFoundException(`Car with id: ${idCar} not found`);
  }
    if(updateCarDto.model){
       updateCar.model = updateCarDto.model;
    }

    if(updateCarDto.make){
      updateCar.make = updateCarDto.make;
    }

    if(updateCarDto.user){
      updateCar.user = updateCarDto.user;
    }

    const saveNewCar = this.carsRepository.create(updateCar);
    await this.carsRepository.save(saveNewCar);
    
     return saveNewCar;
 }

  async findOne(idCar: string): Promise<Car> {
    const response = await this.carsRepository.findOne({
      where: { idCar: idCar },
    });
    if (!response) {
      throw new BadRequestException(` Car with id ${idCar} not found `);
    }

    return response;
  }

  async findAllCars(page: string, limit: string) {
    const consultPage = page !== undefined ? Number(page) : 1;
    const consultLimit = limit !== undefined ? Number(limit) : 5;
    const skip = (consultPage - 1) * consultLimit;

    return await this.carsRepository.find({
      take: consultLimit,
      skip: skip,
      order: { make: 'ASC' },
      relations: ['user'],
    });
  }

  async remove(idCar: string): Promise<string> {
    const { affected } = await this.carsRepository.delete(idCar);

    if (affected == 0) {
      throw new NotFoundException(`Car with id ${idCar} not found`);
    } else {
      return "Car delete successful";
    }
  }

  async removeCarsByUserId(userId: string): Promise<string> {
   const { affected } = await this.carsRepository.delete({ user: { id: userId } });

   if( affected === 0 ){
     return `There was any car with user Id: ${userId} for delete`
   } else {
    return "All cars with that user id were delete"
   }
  }
}
