import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("historic")
export class Historical {

@PrimaryColumn("uuid")   
idHistoric:string;


@Column("uuid", { nullable: false })
idUser:string;

@Column("uuid", { nullable: false })
idCar:string;


@Column("text", { nullable: false })
activity:string;

@Column( {type: "timestamp without time zone" ,  nullable: false} )
date:Date;

}
