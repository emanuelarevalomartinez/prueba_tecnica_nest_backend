import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Roles } from '../enums/roles';
import { Car } from 'src/car/entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'Juan',
    description: 'Name user',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'juan@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'passwordQuery123*',
    description: 'User password',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsOptional()
  @ApiProperty({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        idCar: {
          type: 'string',
          example: '331133a9-0521-4687-8e1b-f41c3f202177',
        },
        make: { type: 'string', example: 'XL' },
        model: { type: 'string', example: 'Toyota' },
      },
    },

    example: [
      {
        idCar: '331133a9-0521-4687-8e1b-f41c3f202177',
        make: 'XL',
        model: 'Toyota',
      },
      {
        idCar: '331133a9-0521-4687-8e1b-f41c3f202177',
        make: 'LV',
        model: 'Audi',
      },
    ],
    description: 'User asignated cars',
  })
  @IsArray()
  cars: Car[];

  @ApiProperty({
    enum: Roles,
    isArray: true,
    example: ['admin', 'employee', 'client'],
    description: 'User Roles',
  })
  @IsArray()
  @IsNotEmpty()
  roles: Roles[];
}
