import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async logInUser(signInDto: signInDto) {
    const user = await this.userRepository.findByEmailRetunPassword(
      signInDto.email,
    );

    const currentDate = new Date();

    if (!user) {
      throw new UnauthorizedException('Access Denied');
    }

    if (user.userBlockedUntil && user.userBlockedUntil > currentDate) {
      const timeLeft = user.userBlockedUntil.getTime() - currentDate.getTime();

      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      throw new UnauthorizedException(
        `User is blocked. Time left: ${minutes} minutes and ${seconds} seconds.`,
      );
    }

    if (signInDto.googleAuth !== true) {
      const isPasswordCorrect = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        await this.userRepository.passwordNumberOfAttemptsCount(user.id, false);

        if (user.numberOfAttempts > 2) {
          await this.userRepository.UserBlockedDateCount(user.id, false);

          throw new UnauthorizedException('User is blocked. Try again later.');
        }

        throw new UnauthorizedException('Access Denied');
      }
    }

    this.userRepository.passwordNumberOfAttemptsCount(user.id, true);
    this.userRepository.UserBlockedDateCount(user.id, true);

    const jwtToken = await this.jwtService.signAsync({
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      userRole: user.role,
    });

    return {
      accessToken: jwtToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userRepository.findByEmailRetunPassword(
      googleUser.email,
    );
    if (user) return user;

    return await this.userRepository.create(googleUser);
  }
}
