import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TbTask } from 'src/entity/task.entity';
import { TaskQuery } from 'src/queryParameter/task.query';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TbTask)
    private readonly taskRepository: Repository<TbTask>,
  ) {}

  async getTaskById(TaskId: number): Promise<TbTask | undefined> {
    try {
      let query = this.taskRepository
        .createQueryBuilder('T')
        .select(['T.TaskId', 'T.ProjectId', 'T.TaskDiscipline', 'T.Name'])
        .where('T.TaskId = :TaskId', { TaskId });
      const task = await query.getOne();
      console.log('task', TaskId, query.getSql(), task);
      return task;
    } catch (error) {
      console.log(`Error finding task ${TaskId}`);
      throw error;
    }
  }

  async getTaskDiscipline(taskQuery: TaskQuery): Promise<TbTask[]> {
    try {
      const { discipline } = taskQuery;

      let query = this.taskRepository
        .createQueryBuilder('T')
        .select(['T.TaskId', 'T.ProjectId', 'T.TaskDiscipline'])
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
          discipline: `%${discipline ? discipline : ''}%`,
        });
      console.log('tasks', discipline, query.getSql());
      const results = await query.getRawMany();
      return results;
    } catch (error) {
      console.log(`Error finding discipline`);
      throw error;
    }
  }
}
