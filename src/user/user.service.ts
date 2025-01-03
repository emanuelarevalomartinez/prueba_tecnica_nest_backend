import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Roles } from './enums/roles';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserValidateExist,
  LoginUserInterface,
  RegisterUserInterface,
} from './interfaces/user.interfaces';
import { JwtPayload } from './interfaces/jwt-strategy-payload.interface';
import { CarService } from 'src/car/car.service';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly carService: CarService,

    private readonly jwtService: JwtService,
  ) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<RegisterUserInterface> {
    const { ...data } = createUserDto;

    const userExist = await this.findOneByNameOrEmail(data.name, data.email);

    if (userExist.nameStock || userExist.emailStock) {
      throw new BadRequestException('user or email already exist');
    }

    const newUser: User = {
      roles: [Roles.CLIENT],
      email: data.email,  
      id: uuid(),
      name: data.name,
      cars: [], 
      password: await bcrypt.hash(data.password, 10),
    };

    const createNewUser = this.userRepository.create(newUser);

    if (!createNewUser) {
      throw new BadRequestException('user was not created');
    }

    await this.userRepository.save(createNewUser);

    let carPromises = [];

    if (data.cars && data.cars.length > 0) {
       carPromises = data.cars.map(async (car) => {
          return this.carService.create({
              make: car.make,
              model: car.model,
              user: createNewUser,
          });
      });
    await Promise.all(carPromises);
    createNewUser.cars = carPromises;
  }


  
  

    return {
      name: createNewUser.name,
      email: createNewUser.email,
      roles: createNewUser.roles,
      cars: createNewUser.cars,
      token: this.getJwToken({ id: createNewUser.id, roles: createNewUser.roles }),
    };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserInterface> {
    const { name, password } = loginUserDto;

    const userFound = await this.userRepository.findOneBy({
      name: name,
    });

    if (!userFound) {
      throw new BadRequestException(`user with name ${name} not foud `);
    }

    const response = await bcrypt.compare(password, userFound.password);

    if (!response) {
      throw new BadRequestException('wrong password');
    }

    return {
      name: userFound.name,
      email: userFound.email,
      roles: userFound.roles,
      cars: userFound.cars,
      token: this.getJwToken({ id: userFound.id, roles: userFound.roles }),
    };
  }

   async findUserByParam(param : { [key: string] :string}): Promise<User> {

    
    const findUser = await this.userRepository.findOne(
      { 
        where: param,
        relations: ["cars"] 
        }
    );


  
    if (!findUser) {
      throw new NotFoundException(`user with ${ JSON.stringify(param) } not found`);
    }
    
    return findUser;
  }

  

  async findOneByNameOrEmail(
    name?: string,
    email?: string,
  ): Promise<CreateUserValidateExist> {
    let searchUser: User;

    if (name) {
      searchUser = await this.userRepository.findOneBy({
        name: name,
      });

      if (searchUser) {
        return {
          nameStock: true,
          emailStock: false,
        };
      }
    }
    if (email) {
      searchUser = await this.userRepository.findOneBy({
        email: email,
      });

      if (searchUser) {
        return {
          nameStock: false,
          emailStock: true,
        };
      }
    }

    return {
      nameStock: false,
      emailStock: false,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {

    const searchUser = await this.findUserByParam( { id } );

    if (searchUser) {
      const { ...data } = updateUserDto;

      const userExist = await this.findOneByNameOrEmail(data.name, data.email);

      if (userExist.nameStock || userExist.emailStock) {
        throw new BadRequestException('user or email already exist');
      }
      
      data.roles.forEach(  (rol)=> {
             if( rol !== Roles.CLIENT && rol !== Roles.EMPLOYEE && rol !== Roles.ADMIN){
              throw new BadRequestException("user does not have a valid roles");
           }
      } )

      data.password = await bcrypt.hash(data.password, 10);

      const updateUser = this.userRepository.merge(searchUser, data);

      await this.userRepository.save(updateUser);
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async deleteUser(idUser: string) {
    const { affected } = await this.userRepository.delete(idUser);

    if (affected == 0) {
      throw new NotFoundException(`user with id ${idUser} not found`);
    }
  }

  private getJwToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
