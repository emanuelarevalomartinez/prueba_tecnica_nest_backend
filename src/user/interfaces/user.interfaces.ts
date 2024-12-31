import { Car } from "src/car/entities/car.entity";

export interface RegisterUserInterface{
    name: string;
    email:string;
    token:string;
    roles: string[];
    cars: Car[];
}


export interface LoginUserInterface {

    name: string;
    email:string;
    token:string;
    roles: string[];

}

export interface CreateUserValidateExist{
    nameStock:boolean;
    emailStock:boolean;
}