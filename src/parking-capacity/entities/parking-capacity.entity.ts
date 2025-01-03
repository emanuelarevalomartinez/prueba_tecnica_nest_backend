import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('parkingCapacity')
export class ParkingCapacity {

  @PrimaryColumn("text", { })
  typeCount: string;

  @Column('numeric', {  })
  capacityParking: number;  
}
