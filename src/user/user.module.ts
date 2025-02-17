import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarModule } from 'src/car/car.module';
import { JwTokenStrategy } from './strategy/jwtStrategy';

@Module({
  imports: [
    CarModule,
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
        useFactory: (configureService: ConfigService) => {
            return{
              secret: configureService.get("SECRET_PASSWORD"),
              signOptions: {
                expiresIn: "2h",
              }
            }
        }

    })
  ],
  controllers: [UserController],
  providers: [UserService,JwTokenStrategy],
  exports: [UserService, PassportModule, JwTokenStrategy, JwtModule],
})
export class UserModule {}
