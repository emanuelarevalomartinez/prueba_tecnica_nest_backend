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
  UpdateUserInteface,
} from './interfaces/user.interfaces';
import { JwtPayload } from './interfaces/jwt-strategy-payload.interface';
import { CarService } from 'src/car/car.service';

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

    data.roles.forEach((rol) => {
      if (
        rol !== Roles.CLIENT &&
        rol !== Roles.EMPLOYEE &&
        rol !== Roles.ADMIN
      ) {
        throw new BadRequestException('user does not have a valid roles');
      }
    });

    const newUser: User = {
      roles: data.roles,
      email: data.email,
      id: uuid(),
      name: data.name,
      cars: [],
      parkings: [],
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
      id: createNewUser.id,
      name: createNewUser.name,
      email: createNewUser.email,
      roles: createNewUser.roles,
      cars: createNewUser.cars,
      token: this.getJwToken({
        id: createNewUser.id,
        roles: createNewUser.roles,
      }),
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
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      roles: userFound.roles,
      cars: userFound.cars,
      token: this.getJwToken({ id: userFound.id, roles: userFound.roles }),
    };
  }

  async findUserByParam(param: { [key: string]: string }): Promise<User> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.parkings', 'parkings')
      .leftJoinAndSelect('user.cars', 'cars')
      .addSelect(
        "to_char(parkings.dateInit, 'YYYY-MM-DD HH24:MI:SS')",
        'parkings_dateInit',
      )
      .addSelect(
        "to_char(parkings.dateEnd, 'YYYY-MM-DD HH24:MI:SS')",
        'parkings_dateEnd',
      );
    Object.keys(param).forEach((key) => {
      queryBuilder.andWhere(`user.${key} = :${key}`, { [key]: param[key] });
    });

    const findUser = await queryBuilder.getOne();

    if (!findUser) {
      throw new NotFoundException(
        `user with ${JSON.stringify(param)} not found`,
      );
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

  async findAllUsers(page: string, limit: string): Promise<User[]>{
    const consultPage = page !== undefined ? Number(page) : 1;
    const consultLimit = limit !== undefined ? Number(limit) : 5;
    const skip = (consultPage - 1) * consultLimit;

    const response = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.parkings', 'parkings')
      .leftJoinAndSelect('user.cars', 'cars')
      .addSelect(
        "to_char(parkings.dateInit, 'YYYY-MM-DD HH24:MI:SS')",
        'parkings_dateInit',
      )
      .addSelect(
        "to_char(parkings.dateEnd, 'YYYY-MM-DD HH24:MI:SS')",
        'parkings_dateEnd',
      )
      .orderBy('user.name', 'ASC')
      .take(consultLimit)
      .skip(skip)
      .getMany();

    return response;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserInteface> {
    const searchUser: User = await this.findUserByParam({ id });

    if (searchUser) {
      const { ...data } = updateUserDto;
      const updateUser: User = {
        id: searchUser.id,
        cars: searchUser.cars,
        email: searchUser.email,
        name: searchUser.name,
        parkings: [], // TODO en caso de modificar desde aqui cambiar esto
        password: searchUser.password,
        roles: searchUser.roles,
      };

      const userExist = await this.findOneByNameOrEmail(data.name, data.email);

      if (data.name) {
        if (searchUser.name !== data.name) {
          if (userExist.nameStock) {
            throw new BadRequestException('user or email already exist');
          }
        }
        updateUser.name = data.name;
      }

      if (data.email) {
        if (searchUser.email !== data.email) {
          if (userExist.emailStock) {
            throw new BadRequestException('user or email already exist');
          }
        }
        updateUser.email = data.email;
      }

      if (data.roles) {
        data.roles.forEach((rol) => {
          if (
            rol !== Roles.CLIENT &&
            rol !== Roles.EMPLOYEE &&
            rol !== Roles.ADMIN
          ) {
            throw new BadRequestException('user does not have a valid roles');
          }
        });
        updateUser.roles = data.roles;
      }

      if (data.password) {
        updateUser.password = await bcrypt.hash(data.password, 10);
      }

      if (data.cars) {
        await this.carService.removeCarsByUserId(id);
        const newCars = data.cars.map((carData) =>
          this.carService.create({
            ...carData,
            user: searchUser,
          }),
        );
        updateUser.cars = await Promise.all(newCars);
      }

      updateUser.id = searchUser.id;

      await this.userRepository.save(updateUser);

      return {
        id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
        password: updateUser.password,
        cars: updateUser.cars.map((car) => ({
          idCar: car.idCar,
          make: car.make,
          model: car.model,
        })),
        roles: updateUser.roles,
      };
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async deleteUser(idUser: string): Promise<string> {
    const { affected } = await this.userRepository.delete(idUser);

    if (affected == 0) {
      throw new NotFoundException(`user with id ${idUser} not found`);
    } else {
      return "User delete successful"
    }
  }

  private getJwToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
