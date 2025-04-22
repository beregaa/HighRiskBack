// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // console.log('ENV:', process.env);
  // const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //   }),
  // );

 
  // app.enableCors({ origin: '*' })
  // await app.listen(3001);
}
bootstrap();
