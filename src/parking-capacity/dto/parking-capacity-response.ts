import { ApiProperty } from "@nestjs/swagger";


export class ParkingCapacityUpdateResponse{
    @ApiProperty({
        type: Number,
        example: '5',
        description: 'New Parking Capacity',
        uniqueItems: true,
    })
    newCapacity:string;
}

export class ParkingCapacityGetResponse{
    @ApiProperty({
        type: Number,
        example: '5',
        description: 'Current Parking Capacity',
        uniqueItems: true,
    })
    currentParkingCapacity:string;
}