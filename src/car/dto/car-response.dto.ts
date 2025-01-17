import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";


export class CarResponseCreated{

    @ApiProperty({
        type: String,
        example: '6031c5fe-4b38-4263-bd67-9d8ffdff03b3',
        description: 'Car id',
        uniqueItems: true,
    })
    idCar:string;

    @ApiProperty({
        type: String,
        example: 'Toyota',
        description: 'Car make',
        uniqueItems: true,
    })
    make:string;

    @ApiProperty({
        type: String,
        example: 'XL',
        description: 'Car model',
        uniqueItems: true,
    })
    model:string;

    @ApiProperty({
        type: String,
        example: '49fdb886-9431-4a76-afec-a407c29f0813',
        description: 'User id',
        uniqueItems: true,
    })
    user:string;
    
}

export class GetOneCarResponse extends OmitType(CarResponseCreated, ["user"] as const){
    @ApiProperty({
        type: CreateUserDto,
        description: 'User',
    })
    user: string;
}

export class GetAllCarsResponse{
    @ApiProperty({
        type: [GetOneCarResponse],
        description: 'Array of cars',
        example: [
         {
        idCar: "331133a9-0521-4687-8e1b-f41c3f202177",
        make: "21",
        model: "Toyota24",
        user: {
          id: "49fdb886-9431-4a76-afec-a407c29f0813",
          name: "emanuel",
          email: "emanuel@gmail.com",
          password: "$2b$10$QFllZBBUUYOshiXuw9szU.M2sM257jtDmr7cztD83WJDWmoKXihpC",
          roles: [
            "employee",
            "client",
            "admin"
          ]
        }
      },
      {
        idCar: "6031c5fe-4b38-4263-bd67-9d8ffdff03b3",
        make: "Ferrary",
        model: "murcielago",
        user: {
          id: "49fdb886-9431-4a76-afec-a407c29f0813",
          name: "emanuel",
          email: "emanuel@gmail.com",
          password: "$2b$10$QFllZBBUUYOshiXuw9szU.M2sM257jtDmr7cztD83WJDWmoKXihpC",
          roles: [
            "employee",
            "client",
            "admin"
          ]
        }
      },
        ]
   
    })
    cars: GetOneCarResponse[];
}

export class CarSuccesfulDeleted{
    @ApiProperty({
      type: String,
      example: 'All cars with that id were delete',
      description: 'Car Delete',
      uniqueItems: true,
    })
    response:string;
  }