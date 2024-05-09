import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum EGrade {
  ADVANCED = 'advanced',
  INTERMEDIATE = 'intermediate',
  FUNDAMENTAL = 'fundamental',
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: EGrade })
  grade: EGrade;

  @ManyToOne(() => User, (user) => user.skills)
  user: User;
}
