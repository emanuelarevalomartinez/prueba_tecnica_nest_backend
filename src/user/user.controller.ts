import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Autentication } from './decorators/auentication';
import { Roles } from './enums/roles';
import { User } from './entities/user.entity';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOneUserResposeDto, UserResponseDto, UserResponseLoginDto } from './dto/user-response.dto';
import { UserNameNotFoundOrWrongPassword, UserNameOrEmailExistBadRequest } from './dto/user-bad-request';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post("register")
  @ApiResponse( { status: 201, description: "New User was created", type: UserResponseDto } )
  @ApiResponse( { status: 400, description: "User not Exist", type: UserNameOrEmailExistBadRequest } )
  register(@Body()createUserDto: CreateUserDto){
    return this.userService.registerUser(createUserDto);
  }

  @Post("login")
  @ApiResponse( { status: 201, description: "User login", type: UserResponseLoginDto } )
  @ApiResponse( { status: 400, description: "User not login", type: UserNameNotFoundOrWrongPassword } )
  login(@Body() LoginUserDto: LoginUserDto){
     return this.userService.loginUser(LoginUserDto);
  }

  @Get(":key/:param")
  @ApiParam({ 
    name: 'key', 
    required: true, 
    description: 'Key to find the user', 
  }) 
  @ApiParam({ 
    name: 'param', 
    required: true, 
    description: 'Param to search the user', 
  })
  @ApiResponse( { status: 201, description: "One user found", type: GetOneUserResposeDto } )
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
