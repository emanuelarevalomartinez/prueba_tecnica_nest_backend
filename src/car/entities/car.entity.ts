import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";


@Entity("cars")
export class Car {

@ApiProperty()
@PrimaryColumn("uuid")
idCar:string;

@ApiProperty() 
@Column("text", { nullable: false })
make: string;

// @Column()
// userID:string;

@ApiProperty()
@Column("text", { nullable: false })
model: string;

@ApiProperty({ type: () => User, description: 'The user associated with this car' })
@ManyToOne( ()=> User,
   (user) => user.cars, { nullable: false, onDelete: "CASCADE" },
)
user: User;
  
}
