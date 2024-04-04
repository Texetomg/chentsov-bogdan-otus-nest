import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
