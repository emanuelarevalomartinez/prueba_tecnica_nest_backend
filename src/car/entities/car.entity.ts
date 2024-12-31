import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";


@Entity("cars")
export class Car {

@PrimaryColumn("uuid")
idCar:string;

@Column("text", { nullable: false })
make: string;

// @Column()
// userID:string;

@Column("text", { nullable: false })
model: string;

@ManyToOne( ()=> User,
   (user) => user.cars, { nullable: false, onDelete: "CASCADE" },
)
user: User;
  
}
