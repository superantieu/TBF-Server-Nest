import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TbTask } from 'src/entity/task.entity';
import { TaskQuery } from 'src/queryParameter/task.query';
import { TaskDto } from 'src/dto/task.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TbTask)
    private readonly taskRepository: Repository<TbTask>,
  ) {}
  async getUserTasksByUserId(
    userId: number,
  ): Promise<{ tasks: TaskDto[] | undefined; pagination: any }> {
    try {
      const query = this.taskRepository
        .createQueryBuilder('t')
        .leftJoin('t.project', 'p')
        .select(['t', 'p.ProjectName', 'p.CompletedDate'])
        .where(
          `t.UserIds like :userId or t.ProjectId in ('TBF-000-LEAVE', '01_23-11-02_10-13-53')`,
          { userId: `%${userId}%` },
        )
        .orderBy('t.TaskId');
      // const tasks = await query.getRawMany();
      const [tasks, totalTasks] = await query.getManyAndCount();
      console.log('userTask', query.getSql());
      const taskDto = plainToInstance(TaskDto, tasks);
      return { tasks: taskDto, pagination: { count: totalTasks } };
    } catch (error) {
      console.log(`Error finding task`);
      throw error;
    }
  }

  async getTaskById(TaskId: number): Promise<TbTask[] | undefined> {
    try {
      let query = this.taskRepository
        .createQueryBuilder('T')
        .select(['T.TaskId', 'T.ProjectId', 'T.TaskDiscipline', 'T.Name'])
        .where('T.TaskId = :TaskId', { TaskId });
      const task = await query.getMany();
      console.log('task', TaskId, query.getSql(), task);
      return task;
    } catch (error) {
      console.log(`Error finding task ${TaskId}`);
      throw error;
    }
  }

  async getTaskDiscipline(taskQuery: TaskQuery): Promise<TbTask[]> {
    try {
      const { searchTerm } = taskQuery;

      let query = this.taskRepository
        .createQueryBuilder('T')
        .select([
          'T.TaskId as TaskId',
          'T.ProjectId as ProjectId',
          'T.TaskDiscipline as TaskDiscipline',
        ])
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select('TOP(1) innerTask.TaskId')
            .from('tbTask', 'innerTask')
            .where('innerTask.TaskDiscipline = T.TaskDiscipline')
            .orderBy('innerTask.TaskId')
            .getQuery();
          return `T.TaskId IN ${subQuery}`;
        })
        .andWhere('LOWER(T.TaskDiscipline) LIKE LOWER(:discipline)', {
          discipline: `%${searchTerm ? searchTerm : ''}%`,
        });
      console.log('tasks', searchTerm, query.getSql());
      const results = await query.getRawMany();
      return results;
    } catch (error) {
      console.log(`Error finding discipline`);
      throw error;
    }
  }
}
