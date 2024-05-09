import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const existTask = await this.taskRepository.findOne({
      where: {
        name: createTaskDto.name,
      },
    });

    if (existTask) throw new BadRequestException('Task already exist');

    const task = await this.taskRepository.save({
      name: createTaskDto.name,
      description: createTaskDto.description,
      difficulty: createTaskDto.difficulty,
      rating: createTaskDto.rating || 0,
      constraints: createTaskDto.constraints || [],
      examples: createTaskDto.examples || [],
      comments: [],
    });

    return { task };
  }

  findAll() {
    return this.taskRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        difficulty: true,
      },
    });
  }

  async findOne(id: number): Promise<Task | undefined> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
