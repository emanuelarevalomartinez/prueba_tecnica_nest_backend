import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("parking")
export class Parking {

@PrimaryColumn("uuid")
id_parking:string;


@Column("uuid", { nullable: false })
id_car:string;

@ManyToOne(() => User, user => user.parkings, { nullable: false })
user: User;

@Column("text", {  nullable: false})
nameUser: string;

@Column("text", {  nullable: false})
make:string;

@Column("text", {  nullable: false})
model:string;

@Column("numeric", { nullable: false })
parkingPosition:number;

@Column({ type: "timestamp without time zone" ,  nullable: false} )
dateInit: Date;

@Column({ type: "timestamp without time zone" ,  nullable: false} )
dateEnd: Date;


}
