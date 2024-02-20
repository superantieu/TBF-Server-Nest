import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from 'src/controller/task.controller';
import { TbTask } from 'src/entity/task.entity';
import { TaskService } from 'src/service/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TbTask])],
  exports: [TypeOrmModule.forFeature([TbTask])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
