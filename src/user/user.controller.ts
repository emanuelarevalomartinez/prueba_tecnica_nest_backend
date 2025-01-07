import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Autentication } from './decorators/auentication';
import { Roles } from './enums/roles';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post("register")
  register(@Body()createUserDto: CreateUserDto){
    return this.userService.registerUser(createUserDto);
  }

  @Post("login")
  login(@Body() LoginUserDto: LoginUserDto){
     return this.userService.loginUser(LoginUserDto);
  }

  @Get(":key/:param")
    findOne(
      @Param("key") key:string,
      @Param("param") param: string,
    )
      {
      return this.userService.findUserByParam( { [key]: param } );
    }

 
  // @Get()
  // @Autentication( Roles.CLIENT )
  // hello(@Req() req: Request){
    
  //   return "hello everyword"
  // }

  @Get()
  findAll(
    @Query("page") page:string,
    @Query("limit") limit:string,
  ){
     return this.userService.findAllUsers(page, limit);
  }

  @Patch(":idUser")
  updateUser(@Param("idUser") idUser: string, @Body() updateUserDto: UpdateUserDto){
      return this.userService.updateUser(idUser, updateUserDto);
  }

    @Delete(":idUser")
    deleteUser(@Param("idUser") idUser: string){
       return this.userService.deleteUser(idUser);
    }
}
