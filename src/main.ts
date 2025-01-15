import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe())
  app.enableCors(); // permite que se puedan recibir solicitudes desde el frontend 
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
   }) ); // asegura que los datos enviados a la consulta complan con la validacion especificada


   const config = new DocumentBuilder()
   .setTitle('Parking')
   .setDescription('A possible real car parking')
   .setVersion('1.0')
  // .addTag('cats')
   .build();
 const documentFactory = () => SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, documentFactory);


  await app.listen(3000);
}
bootstrap();