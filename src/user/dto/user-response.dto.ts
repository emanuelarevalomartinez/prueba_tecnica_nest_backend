import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "./create-user.dto";


export class UserResponseDto extends OmitType(CreateUserDto, ["password"] as const) {
    @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMmEzMDhmLTRmMTktNGYwNy04OGQxLWJlNTJmNTlkMThiOCIsInJvbGVzIjpbImVtcGxveWVlIiwiY2xpZW50IiwiYWRtaW4iXSwiaWF0IjoxNzM2ODkzNTM3LCJleHAiOjE3MzY5MDA3Mzd9._ZQNLDJ0OQPHD_oAT6ciAGQxLEvH9N973WUf9DtiDNI",
      description: "JWT token",
    })
    token: string;
    @ApiProperty({
      example: "49fdb886-9431-4a76-afec-a407c29f0813",
      description: "User Id",
    })
    id:string;
  }


  export class UserResponseLoginDto extends OmitType(CreateUserDto, ["password","cars"] as const) {
    @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMmEzMDhmLTRmMTktNGYwNy04OGQxLWJlNTJmNTlkMThiOCIsInJvbGVzIjpbImVtcGxveWVlIiwiY2xpZW50IiwiYWRtaW4iXSwiaWF0IjoxNzM2ODkzNTM3LCJleHAiOjE3MzY5MDA3Mzd9._ZQNLDJ0OQPHD_oAT6ciAGQxLEvH9N973WUf9DtiDNI",
      description: "JWT token",
    })
    token: string;
    @ApiProperty({
      example: "49fdb886-9431-4a76-afec-a407c29f0813",
      description: "User Id",
    })
    id:string;
  }

  export class GetOneUserResposeDto extends PartialType(CreateUserDto){
    @ApiProperty({
      example: "49fdb886-9431-4a76-afec-a407c29f0813",
      description: "User Id",
    })
    id:string;

    @ApiProperty({
    type: "array",
    description: "User Parkings",
    items: {
      type: "object",
    properties: {
      id_parking: {
        type: 'string',
        example: 'f16c53fb-68f0-4787-9482-2679e5114386'
      },
      id_car: {
        type: 'string',
        example: '331133a9-0521-4687-8e1b-f41c3f202177'
      },
      nameUser: {
        type: 'string',
        example: 'Juan'
      },
      make: {
        type: 'string',
        example: 'Toyota'
      },
      model: {
        type: 'string',
        example: 'XL'
      },
      parkingPosition: {
        type: 'string',
        example: '3'
      },
      dateInit: {
        type: 'string',
        example: '2060-01-04T07:01:01.000Z'
      },
      dateEnd: {
        type: 'string',
        example: '2070-03-04T07:01:01.000Z'
      },
    },
    }
    })

    parkings:string[];
  }

  export class GetAllUsersResponseDto {
    @ApiProperty({
      type: [GetOneUserResposeDto],
      description: 'Array of users',
      example: [
        {
          id: "49fdb886-9431-4a76-afec-a407c29f0813",
          name: "Juan",
          email: "juan@gmail.com",
          password: "passwordQuery123*",
          cars: [
            {
              idCar: "331133a9-0521-4687-8e1b-f41c3f202177",
              make: "XL",
              model: "Toyota",
            },
            {
              idCar: "331133a9-0521-4687-8e1b-f41c3f202177",
              make: "LV",
              model: "Audi",
            },
          ],
          roles: ["admin", "employee", "client"],
          parkings: [
            {
              id_parking: "f16c53fb-68f0-4787-9482-2679e5114386",
              id_car: "331133a9-0521-4687-8e1b-f41c3f202177",
              nameUser: "Juan",
              make: "Toyota",
              model: "XL",
              parkingPosition: "3",
              dateInit: "2060-01-04T07:01:01.000Z",
              dateEnd: "2070-03-04T07:01:01.000Z",
            },
          ],
        },
        {
          id: "23adb886-1234-4a76-afec-a407c29f0823",
          name: "Maria",
          email: "maria@gmail.com",
          password: "passwordMaria123*",
          cars: [
            {
              idCar: "231133a9-1234-4687-8e1b-f41c3f202177",
              make: "Ford",
              model: "Fiesta",
            },
          ],
          roles: ["user"],
          parkings: [
            {
              id_parking: "a16c53fb-68f0-4787-9482-2679e5114386",
              id_car: "231133a9-1234-4687-8e1b-f41c3f202177",
              nameUser: "Maria",
              make: "Ford",
              model: "Fiesta",
              parkingPosition: "5",
              dateInit: "2065-01-04T07:01:01.000Z",
              dateEnd: "2075-03-04T07:01:01.000Z",
            },
          ],
        },
      ],
    })
    users: GetOneUserResposeDto[];
  }

  export class UserSuccesfulDeleted{
    @ApiProperty({
      type: String,
      example: 'User delete successful',
      description: 'User Delete',
      uniqueItems: true,
    })
    response:string;
  }
  