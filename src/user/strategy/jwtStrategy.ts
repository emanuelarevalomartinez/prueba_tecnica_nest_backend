import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwt-strategy-payload.interface";


@Injectable()
export class JwTokenStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User ) 
         private usuarioModel: Repository<User>,
         configService: ConfigService,
    ){
       super({
        secretOrKey: configService.get("SECRET_PASSWORD"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       })
    }
     
   async validate( payload: JwtPayload ) :Promise<User> {

    const { id } = payload;

    const usuario = await this.usuarioModel.findOneBy({ id: id });

    if( !usuario ){
       throw new UnauthorizedException(" Token no valido ");
    }

     return usuario;
   }

}