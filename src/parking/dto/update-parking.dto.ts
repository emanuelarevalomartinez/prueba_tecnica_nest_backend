// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateParkingDto } from './create-parking.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateParkingDto extends PartialType(CreateParkingDto) {


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
