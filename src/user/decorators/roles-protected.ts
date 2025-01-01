import { SetMetadata } from "@nestjs/common";
import { Roles } from "../enums/roles";


export const META_ROLES = "roles";

export const RolesProtected = (...args: Roles[]) => {

   return SetMetadata(META_ROLES, args);
}