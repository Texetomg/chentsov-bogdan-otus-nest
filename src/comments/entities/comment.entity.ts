import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @Column()
  value: string;

  @Column()
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
