import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
