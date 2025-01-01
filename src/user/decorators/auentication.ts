import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "../enums/roles";
import { AuthGuard } from "@nestjs/passport";
import { RolesProtected } from "./roles-protected";
import { UserRolesGuard } from "../guards/user-roles-guard";


export function Autentication(...roles: Roles[]){
    return applyDecorators(
        RolesProtected(...roles),
        UseGuards( AuthGuard() ,UserRolesGuard ),
    )
}