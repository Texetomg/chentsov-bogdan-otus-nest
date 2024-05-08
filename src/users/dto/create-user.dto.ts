import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'password must be at least 6 characters',
  })
  password: string;

  @IsEmail()
  email: string;
}
