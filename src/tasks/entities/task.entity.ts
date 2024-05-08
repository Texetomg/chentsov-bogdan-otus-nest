import { Discussion } from 'src/discussions/entities/discussion.entity';
import { Solution } from 'src/solutions/entities/solution.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

type TExample = {
  text: string;
  answer: string;
};

export enum EDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column('text', { array: true })
  constraints: string[];

  @OneToMany(() => Tag, (tag) => tag.task)
  tags: Tag[];

  @OneToOne(() => Solution, (solution) => solution.task)
  solution: Solution;

  @Column({ type: 'json' })
  examples: TExample[];

  @OneToOne(() => Discussion, (discussion) => discussion.task)
  discussions: Discussion[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ type: 'enum', enum: EDifficulty })
  difficulty: EDifficulty;
}
