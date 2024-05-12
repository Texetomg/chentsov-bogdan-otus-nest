import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.solutions)
  user: User;

  @ManyToOne(() => Task, (task) => task.solutions)
  task: Task;

  @Column()
  value: string;
}
