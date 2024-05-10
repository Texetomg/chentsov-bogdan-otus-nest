import { Injectable, Req } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    taskId: number,
  ) {
    const comment = await this.commentRepository.save({
      task: { id: taskId },
      user: { id: userId },
      value: createCommentDto.value,
      rating: 0,
    });

    return { comment };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async findByTask(id: number) {
    return await this.commentRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          login: true,
        },
      },
      where: {
        task: {
          id,
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
