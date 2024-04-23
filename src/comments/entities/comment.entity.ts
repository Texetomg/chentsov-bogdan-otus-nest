import { Discussion } from 'src/discussions/entities/discussion.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.comments)
  discussion: Discussion;

  @Column()
  value: string;

  @Column()
  rating: number;
}
