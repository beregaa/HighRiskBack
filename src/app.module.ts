import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/conststs';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/entities/file.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600000s' },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 3306),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD + '$$',
      database: process.env.DATABASE_NAME,
      // entities: [Product, User, FileEntity , ],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // ProductsModule,
    UsersModule,
    AuthModule,
    // FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
