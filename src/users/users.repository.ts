import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly useRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.useRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);

    try {
      const result = await this.useRepository.save(newUser);
      const { password, ...user } = result;

      return user;
    } catch (err) {
      if (err.errno == 1062) {
        throw new BadRequestException('this emaii already exists');
      }
    }
  }

  findByEmailRetunPassword(email: string) {
    return this.useRepository.findOne({
      where: { email: email },
      select: {
        email: true,
        password: true,
        username: true,
        id: true,
        numberOfAttempts: true,
        userBlockedUntil: true,
        role: true,
      },
    });
  }

  async passwordNumberOfAttemptsCount(id: number, reset: boolean = false) {
    const user = await this.useRepository.findOne({ where: { id: id } });

    if (reset) {
      user.numberOfAttempts = 0;
    } else {
      user.numberOfAttempts++;
    }

    await this.useRepository.update(user.id, user);
  }

  async UserBlockedDateCount(id: number, reset: boolean = false) {
    const user = await this.useRepository.findOne({ where: { id: id } });

    if (reset) {
      user.userBlockedUntil = null;
    } else {
      user.userBlockedUntil = new Date();
      user.userBlockedUntil.setSeconds(user.userBlockedUntil.getSeconds() + 30);
    }

    await this.useRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
