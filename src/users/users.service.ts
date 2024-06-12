import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ERoles, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) throw new BadRequestException('User already exist');
    const user = await this.userRepository.save({
      email: createUserDto.email,
      login: createUserDto.login,
      password: await argon2.hash(createUserDto.password),
      role: ERoles.USER,
      rank: 0,
    });

    const token = this.jwtService.sign({
      email: createUserDto.email,
    });

    return { user, token };
  }

  async findAll() {
    return this.userRepository.find({
      select: {
        id: true,
        login: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateUserDto) {
    const task = await this.userRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.userRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const task = await this.findOneById(id);
    return await this.userRepository.remove(task);
  }
}
