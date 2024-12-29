import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post("register")
  register(@Body()createUserDto: CreateUserDto){
    return this.userService.registerUser(createUserDto);
  }

  @Get("login")
  login(@Body() LoginUserDto: LoginUserDto){
     return this.userService.loginUser(LoginUserDto);
  }

  // @Get(":idUser")
  //   findOne(@Param("idUser") idUser: string){
  //   }

  @Patch(":idUser")
  updateUser(@Param("idUser") idUser: string, @Body() updateUserDto: UpdateUserDto){
      return this.userService.updateUser(idUser, updateUserDto);
  }

    @Delete(":idUser")
    deleteUser(@Param("idUser") idUser: string){
       return this.userService.deleteUser(idUser);
    }
}
