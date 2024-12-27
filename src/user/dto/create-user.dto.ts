import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../enums/roles";

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
    
    // @IsArray()
    // @IsNotEmpty()
    // roles: Roles[];
    

    
}
