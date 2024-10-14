import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'reversedb.c3kuaa2ogp2y.eu-north-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'mindArchitacture3000',
      database: 'reverseDB',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
