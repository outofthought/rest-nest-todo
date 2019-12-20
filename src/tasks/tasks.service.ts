import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      // throw new NotFoundException(); // automatically forms an error exception
      throw new NotFoundException(`Task with id "${id}" not found`);
      // it will also work for updating as it uses the same getTaskById method
    }
    return found;
  }
}
