import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }
    throw new UnauthorizedException('Wrong credentials');
  }
}
