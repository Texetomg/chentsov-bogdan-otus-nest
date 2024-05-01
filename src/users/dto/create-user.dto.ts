import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @IsEmail()
  email: string;
}
