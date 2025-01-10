import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Roles } from "../enums/roles";
import { Car } from "src/car/entities/car.entity";
import { Parking } from "src/parking/entities/parking.entity";


@Entity("users")
export class User {

@PrimaryColumn("uuid", { nullable: false })
id: string;

@OneToMany(() => Parking, parking => parking.user)
  parkings: Parking[];


@Column("text", { nullable: false })
name: string;


@Column("text", { nullable: false })
email: string;


@Column("text", { nullable: false })
password: string;

@Column("simple-array", { nullable: false })
roles: Roles[];

@OneToMany(() => Car, 
(car) => car.user, { cascade: true, nullable: true })
cars: Car[];


}
