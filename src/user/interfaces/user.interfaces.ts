import { Car } from "src/car/entities/car.entity";
import { Parking } from "src/parking/entities/parking.entity";

export interface RegisterUserInterface{
    id:string;
    name: string;
    email:string;
    token:string;
    roles: string[];
    cars: Car[];
}


export interface LoginUserInterface {
    id:string;
    name: string;
    email:string;
    token:string;
    roles: string[];
    cars: Car[];

}

export interface UserCarInterface{
        idCar: string;
        make: string;
        model: string;
}

export interface UpdateUserInteface{
    id:string;
    email:string;
    name:string;
    password:string;
    roles:string[];
    cars: UserCarInterface[],
}

export interface CreateUserValidateExist{
    nameStock:boolean;
    emailStock:boolean;
}