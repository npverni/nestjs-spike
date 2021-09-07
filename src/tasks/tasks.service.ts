import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter';
import { TaskStatus } from './task-status.enum';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks(filtersDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filtersDto;

    let conditions = {};

    if (status) {
      conditions = {
        ...conditions,
        status: { equals: status },
      };
    }

    if (search) {
      conditions = {
        ...conditions,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    console.log('CONDITIONS', conditions);

    if (Object.keys(conditions).length > 0) {
      return await this.prisma.task.findMany({
        where: conditions,
      });
    } else {
      return await this.prisma.task.findMany();
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Task with ID '${id}' does not exist`);
    }

    return result;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('CTD', createTaskDto);
    const { title, description } = createTaskDto;
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status: 'OPEN',
      },
    });
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    try {
      const updatedTask = await this.prisma.task.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      return updatedTask;
    } catch (e) {
      throw new NotFoundException(`Task with ID '${id}' does not exist`);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException(`Task with ID '${id}' does not exist`);
    }
  }
}
