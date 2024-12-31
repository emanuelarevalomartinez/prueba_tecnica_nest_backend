import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "../enums/roles";
import { Car } from "src/car/entities/car.entity";

export class CreateUserDto {

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


    // @IsOptional()
    @IsArray()
    cars: Car[];
    
    // @IsArray()
    // @IsNotEmpty()
    // roles: Roles[];
    

    
}
