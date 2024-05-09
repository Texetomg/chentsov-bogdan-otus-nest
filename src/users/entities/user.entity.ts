import { Comment } from 'src/comments/entities/comment.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Solution } from 'src/solutions/entities/solution.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ERoles {
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
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: ERoles, default: ERoles.USER })
  role: ERoles;

  @OneToMany(() => Solution, (solution) => solution.user, {
    onDelete: 'CASCADE',
  })
  solutions: Solution;

  @OneToMany(() => Skill, (skill) => skill.user, { onDelete: 'CASCADE' })
  skills: Skill[];

  @Column()
  rank: number;

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];
}
