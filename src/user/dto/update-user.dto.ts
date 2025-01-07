import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../enums/roles';
import { Car } from 'src/car/entities/car.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsString()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;
    
    @IsString()
    @IsOptional()
    password?: string;

    @IsArray()
    @IsOptional()
    roles?: Roles[];

    @IsArray()
    @IsOptional()
    cars?: Car[];

}
