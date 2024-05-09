import { IsNotEmpty } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  id: number;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  task: Task;

  @IsNotEmpty()
  value: string;

  rating: number;
}
