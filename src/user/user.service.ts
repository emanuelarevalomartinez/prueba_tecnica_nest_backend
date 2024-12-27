import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Roles } from './enums/roles';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {
  CreateUserValidateExist,
  LoginUserInterface,
  RegisterUserInterface,
} from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<RegisterUserInterface> {
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
      password: await bcrypt.hash(data.password, 10),
    };

    const createNewUser = this.userRepository.create(newUser);

    if (!createNewUser) {
      throw new BadRequestException('user was not created');
    }

     await this.userRepository.save(createNewUser);

    return{
      name: createNewUser.name,
      email: createNewUser.email,
      roles: createNewUser.roles,
      token: "token temporal",
    }
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
      token: 'token generico',
    };
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

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
