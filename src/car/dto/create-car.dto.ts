import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

export class CreateCarDto {
  @ApiProperty({
    type: String,
    example: 'Toyota',
    description: 'Car make',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  make: string;

  @ApiProperty({
    type: String,
    example: 'XL',
    description: 'Car model',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({
    type: CreateUserDto,
    description: 'User asociated with car',
    uniqueItems: true,
  })
  @IsNotEmpty()
  user: User;
}
