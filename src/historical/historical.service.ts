import { Injectable } from '@nestjs/common';
import { CreateHistoricalDto } from './dto/create-historical.dto';
import { UpdateHistoricalDto } from './dto/update-historical.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historical } from './entities/historical.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'

@Injectable()
export class HistoricalService {

  // TODO colocal las autorizaciones a los endpoints de cada modulo
  // TODO añadir los metodos faltantes
  // TODO comenzar a hacer el testing dentro de los metodos 
  // TODO hacer la documentacion para descargar y ejecutar la api en un entorno personal usando markdown
  // TODO utilizar swaer para documentar la api
  // TODO colecion de postmand de como consultar la api
  // TODO hacer el modelo de datos del negocio ( las relaciones en la base de datos )


  constructor(
    @InjectRepository(Historical)
    private readonly historicalRepository: Repository<Historical>,
  ){

  }

  async create(createHistoricalDto: CreateHistoricalDto): Promise<Historical> {

   const newHistoric = this.historicalRepository.create({
    idHistoric: uuid(),
    idUser: createHistoricalDto.idUser,
    date: new Date(),
    idCar: createHistoricalDto.idCar,
    activity: createHistoricalDto.activity,  
   })

   return await this.historicalRepository.save(newHistoric);
  }

  

  async findAll(page: string, limit: string) : Promise<Historical[]> {

    const consultPage = page !== undefined ? Number(page) : 1;
    const consultLimit = limit !== undefined ? Number(limit) : 5;
    const skip = ( consultPage - 1 ) * consultLimit;

   const response = await this.historicalRepository.createQueryBuilder("historic")
   .select([
      "historic.idHistoric as idhistoric",
      "historic.idUser as iduser",
      "historic.idCar as idcar",
      "historic.activity as activity",
      "to_char(historic.date, 'YYYY-MM-DD HH24:MI:SS') AS date"
   ])
   .orderBy("historic.date", 'ASC')
   .take( consultLimit )  
   .skip( skip )
   .getRawMany();

    return response;
  }

  async updateHistorical(idHistorical: string, updateHistoricalDto: UpdateHistoricalDto){
    // TODO implementar
  }

  findOne(idHistoric: number) {
    // TODO implementar
  }

  remove(idHistoric: string) {
    // TODO implementar
  }
}
