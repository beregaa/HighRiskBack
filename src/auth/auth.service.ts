import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginUserDto } from './dto/login-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepository) {}

  async logInUser(data: loginUserDto) {
    const user = await this.userRepo.findOneByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Acess Denide');
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Acess Denide');
    }

    return user;
  }
}
