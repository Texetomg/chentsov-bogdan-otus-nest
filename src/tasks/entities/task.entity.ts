import { Comment } from 'src/comments/entities/comment.entity';
import { Solution } from 'src/solutions/entities/solution.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export type TExample = {
  input: string;
  output: string;
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
  rating?: number;

  @Column('text', { array: true })
  constraints?: string[];

  @OneToMany(() => Tag, (tag) => tag.task)
  tags?: Tag[];

  @OneToMany(() => Solution, (solution) => solution.task)
  solutions?: Solution[];

  @Column({ type: 'json' })
  examples?: TExample[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments?: Comment[];

  @Column({ type: 'enum', enum: EDifficulty })
  difficulty: EDifficulty;
}
