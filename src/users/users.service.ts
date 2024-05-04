import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ERoles, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
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

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  /*  findAll() {
    this.users;
  }

 

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((task) => task.id === id);
    const newUser = {
      ...user,
      ...updateUserDto,
    };

    return newUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
