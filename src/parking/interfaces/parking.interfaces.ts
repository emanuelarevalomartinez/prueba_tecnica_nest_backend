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

export interface GetOneParkingInterface{
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_roles: string[];
    id_parking: string;
    id_car: string;
    userid: string;
    nameuser: string;
    make: string;
    model: string;
    parkingposition: string;
    dateinit: string;
    dateend: string;
}