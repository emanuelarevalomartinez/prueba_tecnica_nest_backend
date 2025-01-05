import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateParkingDto {

    @IsNotEmpty()
    @IsString()
    nameUser: string;

    @IsNotEmpty()
    @IsString()
    dateInit:string;

    @IsNotEmpty()
    @IsString()
    dateEnd:string;

    @IsNotEmpty()
    @IsNumber()
    positionParking:number;

}
