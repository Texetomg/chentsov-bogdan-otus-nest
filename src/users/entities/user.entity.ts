import { Comment } from 'src/comments/entities/comment.entity';
import { Discussion } from 'src/discussions/entities/discussion.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Solution } from 'src/solutions/entities/solution.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum ERoles {
  USER = 'user',
  ADMIN = 'admin',
  INTERVIEWER = 'interviewer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: ERoles, default: ERoles.USER })
  roleEnum: ERoles;

  @OneToMany(() => Solution, (solution) => solution.user, {
    onDelete: 'CASCADE',
  })
  solutions: Solution;

  @OneToMany(() => Skill, (skill) => skill.user, { onDelete: 'CASCADE' })
  skills: Skill[];

  @OneToMany(() => Discussion, (discussion) => discussion.user, {
    onDelete: 'CASCADE',
  })
  discussions: Discussion[];

  @Column()
  rank: number;

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];
}
