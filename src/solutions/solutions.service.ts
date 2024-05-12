import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from './entities/solution.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private readonly solutionRepository: Repository<Solution>,
  ) {}
  async create(
    createCommentDto: CreateSolutionDto,
    userId: number,
    taskId: number,
  ) {
    const solution = await this.solutionRepository.save({
      value: createCommentDto.value,
      user: { id: userId },
      task: { id: taskId },
    });

    if (!solution) {
      throw new NotFoundException('Solution not found');
    }
    return { solution };
  }

  async findByTask(userId: number, taskId: number) {
    const solution = await this.solutionRepository.findOne({
      where: {
        task: {
          id: taskId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (!solution) {
      throw new NotFoundException('Solution not found');
    }
    return { solution };
  }

  async update(updateSolutionDto: UpdateSolutionDto, userId, taskId) {
    const solution = await this.solutionRepository.findOne({
      where: {
        task: {
          id: taskId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!solution) {
      throw new NotFoundException('Solution not found');
    }
    return await this.solutionRepository.update(solution.id, updateSolutionDto);
  }
}
