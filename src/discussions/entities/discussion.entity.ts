import { Comment } from 'src/comments/entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Comment, (comment) => comment.discussion)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.discussions)
  user: User;

  @ManyToOne(() => Task, (task) => task.discussions)
  task: Task;
}
