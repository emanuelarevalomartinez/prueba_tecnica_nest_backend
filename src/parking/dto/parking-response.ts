import { ApiProperty, OmitType } from "@nestjs/swagger";


export class CreateParkingResponse{

    @ApiProperty({
        type: String,
        example: '03129afb-8aef-42b0-a3a5-8188b088d014',
        description: 'Parking Id',
        uniqueItems: true,
      })
      idParking:string;

      @ApiProperty({
        type: String,
        example: '49fdb886-9431-4a76-afec-a407c29f0813',
        description: 'User Id',
        uniqueItems: true,
      })
      idUser:string;

      @ApiProperty({
        type: String,
        example: '331133a9-0521-4687-8e1b-f41c3f202177',
        description: 'Car Id',
        uniqueItems: true,
      })
      idcar:string;

      @ApiProperty({
        type: String,
        example: 'Juan',
        description: 'User name',
        uniqueItems: true,
      })
      nameUser:string;

      @ApiProperty({
        type: String,
        example: 'Toyota',
        description: 'Car Make',
        uniqueItems: true,
      })
      make:string;

      @ApiProperty({
        type: String,
        example: 'XL',
        description: 'Car Model',
        uniqueItems: true,
      })
      model:string;

      @ApiProperty({
        type: String,
        example: '2028-01-04T07:01:01.000Z',
        description: 'Date init reservation',
        uniqueItems: true,
      })
      dateinit:string;

      @ApiProperty({
        type: String,
        example: '2030-03-04T07:01:01.000Z',
        description: 'Date en reservation',
        uniqueItems: true,
      })
      dateend:string;

      @ApiProperty({
        type: String,
        example: '1',
        description: 'Parking position of the car',
        uniqueItems: true,
      })
      parkingposition:string;
}

export class GetOneParkingResponse extends OmitType(CreateParkingResponse, ["idUser","idcar"] as const){}


export class GetAllParkingResponse{
    @ApiProperty({
        type: [GetOneParkingResponse],
        description: "Array of all Parkings",
        example: [
             {
        id_parking: "ec5536e3-42e3-489a-a9da-bf3ac29c6021",
        nameuser: "emanuel",
        make: "21",
        model: "Toyota24",
        parkingposition: "1",
        dateinit: "2031-01-04 02:01:01",
        dateend: "2035-03-04 02:01:01"
      },
      {
        id_parking: "03129afb-8aef-42b0-a3a5-8188b088d014",
        nameuser: "emanuel",
        make: "21",
        model: "Toyota24",
        parkingposition: "1",
        dateinit: "2028-01-04 02:01:01",
        dateend: "2030-03-04 02:01:01"
      },
        ]
    })
    allParkings: GetOneParkingResponse[];
}

export class UpdateParkingResponse extends OmitType(CreateParkingResponse, ["idUser"] as const){}

export class ParkingSuccesfulDeleted{
    @ApiProperty({
      type: String,
      example: 'Parking reservation deleted successful',
      description: 'Parking Delete',
      uniqueItems: true,
    })
    response:string;
  }