import { ApiProperty } from "@nestjs/swagger";


export class HistoricGenericBadResponse {

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