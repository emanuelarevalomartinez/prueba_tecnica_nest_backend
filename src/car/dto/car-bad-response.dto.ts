import { ApiProperty } from "@nestjs/swagger";


export class CarCreateBadResponse {

    @ApiProperty({
      type: 'string',
      example: 'Car was not create',
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

  export class CarGenericBadResponse {

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