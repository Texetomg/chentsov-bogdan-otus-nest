import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      name: 'Biba',
      description: 'description',
    },
    {
      id: 2,
      name: 'Boba',
      description: 'description',
    },
  ];

  create(createTaskDto: CreateTaskDto) {
    return {
      id: this.tasks.length,
      ...createTaskDto,
    };
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);
    const newTask = {
      ...task,
      ...updateTaskDto,
    };
    return newTask;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
