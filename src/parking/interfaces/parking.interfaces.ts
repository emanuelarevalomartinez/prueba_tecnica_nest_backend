

export interface CreateParkingInterface {
    idParking: string;
    idUser:string;
    idCar:string;
    nameUser: string;
    make: string;
    model: string;
    dateInit: Date;
    dateEnd:Date;
    parkingPosition: number;

}