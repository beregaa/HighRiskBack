import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new User();

    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;

    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email } });
  }
  findOne(id: number) {
    return this.userRepo.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
