import { Column, Entity, PrimaryColumn } from "typeorm";
import { Roles } from "../enums/roles";


@Entity("users")
export class User {

@PrimaryColumn("uuid", { nullable: false })
id: string;


@Column("text", { nullable: false })
name: string;


@Column("text", { nullable: false })
email: string;


@Column("text", { nullable: false })
password: string;

@Column("simple-array", { nullable: false })
roles: Roles[];


}
