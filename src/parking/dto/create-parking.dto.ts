import { IsNotEmpty, IsString } from "class-validator";



export class CreateParkingDto {

    @IsNotEmpty()
    @IsString()
    nameUser: string;

}
