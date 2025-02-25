import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UsersModule, ConfigModule.forFeature(googleOauthConfig)],
  controllers: [AuthController],
  providers: [AuthService , GoogleStrategy],
})
export class AuthModule {}
