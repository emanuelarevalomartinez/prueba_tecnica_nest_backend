import { ApiProperty } from '@nestjs/swagger';

export class UserNameOrEmailExistBadRequest {

  @ApiProperty({
    type: 'string',
    example: 'user or email already exist',
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

export class UserNameNotFoundOrWrongPassword {

  @ApiProperty({
    type: 'string',
    example: 'user with id ${id} not exit or wrong password',
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
