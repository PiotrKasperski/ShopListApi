import { Repository } from 'typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { userName: username },
    });
    this.logger.log(user);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { userId: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
