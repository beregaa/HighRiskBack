import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  create(createUserDto: CreateUserDto) {

    if (createUserDto.password === createUserDto.confirmPassword) {
      return this.usersRepo.create(createUserDto);
    }else{

     throw new BadRequestException('passwords dose not match')
    }
  }

  findAll() {
    return this.usersRepo.findAll();
  }

  findOne(id: number) {
    return this.usersRepo.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepo.remove(id);
  }
}
