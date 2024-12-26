import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity("users")
export class User {
    
@PrimaryColumn()
id: string;


@Column("text", { nullable: false })
name: string;


@Column("text", { nullable: false })
email: string;


@Column("text", { nullable: false })
password: string;


}
