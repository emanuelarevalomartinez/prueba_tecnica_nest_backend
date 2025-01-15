import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{

@ApiProperty({
    example: "Juan",
    description: "User name",
    uniqueItems: true,
})
@IsString()
@IsNotEmpty()
name:string;

@ApiProperty({
    example: "passwordQuery123*",
    description: "User password",
    uniqueItems: true,
  })
@IsString()
@IsNotEmpty()
password:string;


}