import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async logInUser(data: loginUserDto) {
    const user = await this.userRepository.findByEmailRetunPassword(data.email);
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

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
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

    this.userRepository.passwordNumberOfAttemptsCount(user.id, true);
    this.userRepository.UserBlockedDateCount(user.id, true);

    delete user.password;
    delete user.numberOfAttempts;
    delete user.userBlockedUntil;

    return user;
  }
}
