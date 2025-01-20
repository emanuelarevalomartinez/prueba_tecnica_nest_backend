import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateParkingDto {

    @ApiProperty({
        type: String,
        example: 'Juan',
        description: 'Name User',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsString()
    nameUser: string;

    @ApiProperty({
        type: Date,
        example: '2031-01-04 02:01:01',
        description: 'Date init reservation',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsString()
    dateInit:string;

    @ApiProperty({
        type: Date,
        example: '2035-03-04 02:01:01',
        description: 'Date end reservation',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsString()
    dateEnd:string;

    @ApiProperty({
        type: Number,
        example: 1,
        description: 'Parking position',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsNumber()
    positionParking:number;

}
