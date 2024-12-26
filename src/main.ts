import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe())
  app.enableCors(); // permite que se puedan recibir solicitudes desde el frontend 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
   }) ); // asegura que los datos enviados a la consulta complan con la validacion especificada
  await app.listen(3000);
}
bootstrap();