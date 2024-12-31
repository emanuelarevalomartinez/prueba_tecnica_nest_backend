import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";



export class CreateCarDto {


@IsNotEmpty()
@IsString()
make:string;


@IsNotEmpty()
@IsString()
model:string;


@IsNotEmpty()
user:User;

}
