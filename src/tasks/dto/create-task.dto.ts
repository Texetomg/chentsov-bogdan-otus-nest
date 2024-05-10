import { IsNotEmpty } from 'class-validator';
import { EDifficulty, TExample } from '../entities/task.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export class CreateTaskDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  difficulty: EDifficulty;

  rating?: number;

  constraints: string[];

  examples: TExample[];

  comments?: Comment[];
}
