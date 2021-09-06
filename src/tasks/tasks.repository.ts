import { Repository } from 'typeorm';
import { Task } from './tasks.model';

export class TasksRepository extends Repository<Task> {}
