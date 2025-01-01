import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { META_ROLES } from "../decorators/roles-protected";
import { User } from "../entities/user.entity";


@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ){

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );



  if( !validRoles ) return true;
  if( validRoles.length == 0 ) return true; 

  const req = context.switchToHttp().getRequest();
  const usuario = req.user as User;

   if( !usuario ){
    throw new BadRequestException(" Usuario not found ");
   }

   for (const rol of usuario.roles ) {
      if( validRoles.includes( rol ) ){
         return true;
      }
   }

   throw new ForbiddenException(`User need a valid role is current role is ${usuario.roles}`);

  }
}