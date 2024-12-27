
export interface RegisterUserInterface{
    name: string;
    email:string;
    token:string;
    roles: string[];
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