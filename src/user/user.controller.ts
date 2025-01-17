import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Autentication } from './decorators/auentication';
import { Roles } from './enums/roles';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersResponseDto, GetOneUserResposeDto, UserResponseDto, UserResponseLoginDto, UserSuccesfulDeleted } from './dto/user-response.dto';
import { UserByParamNotFound, UserNameNotFoundOrWrongPassword, UserNameOrEmailExistBadRequest, UsersNotFound } from './dto/user-bad-request';

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
  @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
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
  @ApiResponse( { status: 201, description: "Find one user", type: GetOneUserResposeDto } )
  @ApiResponse( { status: 401, description: "One user was not found", type: UserByParamNotFound } )
    findOne(
      @Param("key") key:string,
      @Param("param") param: string,
    )
      {
      return this.userService.findUserByParam( { [key]: param } );
    }

  @Get()
  @Autentication( Roles.EMPLOYEE, Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'page', 
    required: false, 
    description: 'Page to show', 
  }) 
  @ApiParam({ 
    name: 'limit', 
    required: false, 
    description: 'Limit of users to see', 
  })
  @ApiResponse( { status: 201, description: "Find all users", type: GetAllUsersResponseDto } )
  @ApiResponse( { status: 401, description: "Find all users failed", type: UsersNotFound } )
  findAll(
    @Query("page") page:string,
    @Query("limit") limit:string,
  ){
     return this.userService.findAllUsers(page, limit);
  }

  @Patch(":idUser")
  @Autentication( Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'idUser', 
    required: true, 
    description: 'User id', 
  }) 
  @ApiResponse( { status: 201, description: "User was update", type: UserResponseDto } )
  @ApiResponse( { status: 400, description: "User with that name or email already exist", type: UserNameOrEmailExistBadRequest } )
  updateUser(@Param("idUser") idUser: string, @Body() updateUserDto: UpdateUserDto){
      return this.userService.updateUser(idUser, updateUserDto);
  }

    @Delete(":idUser")
    @Autentication( Roles.CLIENT, Roles.EMPLOYEE, Roles.ADMIN )
    @ApiBearerAuth('access-token') 
    @ApiParam({ 
      name: 'idUser', 
      required: true, 
      description: 'User id', 
    }) 
    @ApiParam({ 
      name: 'idUser', 
      required: true, 
      description: 'User id', 
    }) 
    @ApiResponse( { status: 201, description: "User delete successful", type: UserSuccesfulDeleted } )
    @ApiResponse( { status: 404, description: "User was not delete", type: UserByParamNotFound } )
    deleteUser(@Param("idUser") idUser: string){
       return this.userService.deleteUser(idUser);
    }
}
