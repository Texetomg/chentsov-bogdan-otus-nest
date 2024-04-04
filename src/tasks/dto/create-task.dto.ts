import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  id: number;

  @IsNotEmpty()
  name: number;

  @IsNotEmpty()
  description: string;
}
