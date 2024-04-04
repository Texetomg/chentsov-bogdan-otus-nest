import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      login: 'Biba',
      name: 'Biba',
      password: 123,
    },
    {
      id: 2,
      login: 'Boba',
      name: 'Boba',
      password: 123,
    },
  ];

  create(createUserDto: CreateUserDto) {
    return {
      id: this.users.length,
      ...createUserDto,
    };
  }

  findAll() {
    this.users;
  }

  findOne(id: number) {
    const user = this.users.find((task) => task.id === id);
    return user;
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
  }
}
