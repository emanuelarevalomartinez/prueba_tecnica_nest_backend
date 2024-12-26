import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingCapacityDto } from './create-parking-capacity.dto';

export class UpdateParkingCapacityDto extends PartialType(CreateParkingCapacityDto) {}
