import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../enums/roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsArray()
    @IsNotEmpty()
    roles: Roles[];

}
