import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskQuery } from 'src/queryParameter/task.query';
import { TaskResponse } from 'src/responseDto/task.responseDto';
import { TaskService } from 'src/service/task.service';

@ApiTags('Tasks')
@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get(':userId')
  async getUserTasksByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<TaskResponse> {
    try {
      const data = await this.taskService.getUserTasksByUserId(userId);
      if (!data) {
        return { result: null, message: 'User task not found' };
      }
      return {
        message: 'Get tasks successfully',
        pagination: data.pagination,
        result: data.tasks,
      };
    } catch (error) {
      return {
        message: 'Error finding user task',
        result: null,
      };
    }
  }
  @Get('/specific/:taskId')
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

  @Get('/discipline/search')
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
