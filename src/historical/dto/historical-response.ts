import { ApiProperty } from "@nestjs/swagger";


export class GetOneHistoricResponse{
    @ApiProperty({
        type: String,
        example: '732b11fe-1850-45d1-8b66-4391008939b9',
        description: 'Historic id',
        uniqueItems: true,
    })
    idhistoric: string;

    @ApiProperty({
        type: String,
        example: '49fdb886-9431-4a76-afec-a407c29f0813',
        description: 'User id',
        uniqueItems: true,
    })
    iduser: string;

    @ApiProperty({
        type: String,
        example: '331133a9-0521-4687-8e1b-f41c3f202177',
        description: 'Car id',
        uniqueItems: true,
    })
    idcar: string;

    @ApiProperty({
        type: String,
        example: 'Cancel Parking',
        description: 'activity',
        uniqueItems: true,
    })
    activity: string;

    @ApiProperty({
        type: String,
        example: '2025-01-10 03:28:20',
        description: 'date',
        uniqueItems: true,
    })
    date: string;
}

export class GetAllHistoricResponse{
    @ApiProperty({
        type: [GetOneHistoricResponse],
        description: 'Array of cars',
        example: [
            {
                idhistoric: "732b11fe-1850-45d1-8b66-4391008939b9",
                iduser: "49fdb886-9431-4a76-afec-a407c29f0813",
                idcar: "331133a9-0521-4687-8e1b-f41c3f202177",
                activity: "Cancel Parking",
                date: "2025-01-10 03:28:20"
              },
              {
                idhistoric: "1455eca3-a4d7-4896-bd11-cdf4b6211e92",
                iduser: "49fdb886-9431-4a76-afec-a407c29f0813",
                idcar: "331133a9-0521-4687-8e1b-f41c3f202177",
                activity: "Reservation Parking",
                date: "2025-01-10 03:29:11"
              },
              {
                idhistoric: "ac975481-49d5-4796-9a4c-85ec1256c0a4",
                iduser: "49fdb886-9431-4a76-afec-a407c29f0813",
                idcar: "331133a9-0521-4687-8e1b-f41c3f202177",
                activity: "Reservation Parking",
                date: "2025-01-17 16:05:52"
              }
        ]
    })

    historics: GetOneHistoricResponse[];
}