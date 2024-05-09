import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  findAll() {
    return this.tasksRepository.find();
  }
  findOne(id: number) {
    return this.tasksRepository.findOne({ where: { id } });
  }
  create(body: any) {
    const newTask = this.tasksRepository.create(body);

    return this.tasksRepository.save(newTask);
  }
  async update(id: number, body: any) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    this.tasksRepository.merge(task, body);
    return this.tasksRepository.save(task);
  }
  async delete(id: number) {
    await this.tasksRepository.delete(id);
    return true;
  }
}
