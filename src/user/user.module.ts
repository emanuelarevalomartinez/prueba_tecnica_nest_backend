import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  providers: [UserService],
})
export class UserModule {}
