import { ApiProperty } from "@nestjs/swagger";


export class ParkingGenericBadResponse{
    
    @ApiProperty({
        type: 'string',
        example: 'Error in the operation',
      })
      message: string;
    
      @ApiProperty({ 
        type: 'string', 
        example: 'Internal server error' 
      }) 
      error: string;
    
      @ApiProperty({ 
        type: 'number', 
        example: 500 
      }) 
      statusCode: number;

}

export class ParkingUpdateBadResponse{

    @ApiProperty({
        type: 'string',
        example: 'Some data is not defines, new Init Date, new End Date or new Parking position',
      })
      message: string;
    
      @ApiProperty({ 
        type: 'string', 
        example: 'Bad Request' 
      }) 
      error: string;
    
      @ApiProperty({ 
        type: 'number', 
        example: 400 
      }) 
      statusCode: number;
}