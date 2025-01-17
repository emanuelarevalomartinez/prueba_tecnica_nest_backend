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

export class UserByParamNotFound{
  @ApiProperty({
    type: 'string',
    example: 'user with {\"{key}\":\"{param}\"} not found',
  })
  message: string;

  @ApiProperty({ 
    type: 'string', 
    example: 'Not Found' 
  }) 
  error: string;

  @ApiProperty({ 
    type: 'number', 
    example: 404 
  }) 
  statusCode: number;
}

export class UsersNotFound{
  @ApiProperty({
    type: 'string',
    example: 'error',
  })
  message: string;

  @ApiProperty({ 
    type: 'string', 
    example: 'Bad Request' 
  }) 
  error: string;

  @ApiProperty({ 
    type: 'number', 
    example: 500 
  }) 
  statusCode: number;
}
