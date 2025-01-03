import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";



@Entity("parking")
export class Parking {

@PrimaryColumn("uuid")
idParking:string;


@Column("uuid", { nullable: false })
idUser:string;

@Column("uuid", { nullable: false })
idCar: string;

@Column("text", {  nullable: false})
nameUser: string;

@Column("text", {  nullable: false})
make:string;

@Column("text", {  nullable: false})
model:string;

// @Column("text", {  nullable: false})
// date:string;

// @Column("text", {  nullable: false})
// hour:string;

@Column({ type: "timestamp without time zone" ,  nullable: false} )
date: Date;


}
