import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskQuery } from 'src/queryParameter/task.query';
import { TaskResponse } from 'src/responseDto/task.responseDto';
import { TaskService } from 'src/service/task.service';

@ApiTags('Tasks')
@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get(':taskId')
  async getTaskById(
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<TaskResponse> {
    try {
      const data = await this.taskService.getTaskById(taskId);
      if (!data) {
        return { result: null, message: 'Task not found' };
      }
      return { result: data, message: 'Get task successfully!' };
    } catch (error) {
      return { result: null, message: 'Error finding task' };
    }
  }

  @Get()
  async getTaskDipcipline(
    @Query() taskQuery: TaskQuery,
  ): Promise<TaskResponse> {
    try {
      const data = await this.taskService.getTaskDiscipline(taskQuery);
      if (!data) {
        return {
          message: 'Discipline not found',
          result: null,
        };
      }
      return {
        message: 'Select discipline successfully',
        result: data,
      };
    } catch (error) {
      return {
        message: 'Error finding discipline',
        result: null,
      };
    }
  }
}
