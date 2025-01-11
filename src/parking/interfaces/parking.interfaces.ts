export interface CreateParkingInterface {
  idParking: string;
  idUser:string;
  idCar:string;
  nameUser: string;
  make: string;
  model: string;
  dateinit: Date;
  dateend:Date;
  parkingposition: number;

}

export interface GetOneParkingInterface{
  id_parking: string;
  id_car: string;
  userid: string;
  nameuser: string;
  make: string;
  model: string;
  parkingposition: number;
  dateinit: Date;
  dateend: Date;
}