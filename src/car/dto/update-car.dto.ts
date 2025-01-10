import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class UpdateCarDto extends PartialType(CreateCarDto) {

    
    @IsOptional()
    @IsString()
    make?:string;
    
    
    @IsOptional()
    @IsString()
    model?:string;
    
    
    @IsOptional()
    user:User;

}
