import { TbTimeSheet } from 'src/entity/timesheet.entity';
import { SelectQueryBuilder } from 'typeorm';

export const hasUserId = (
  query: SelectQueryBuilder<TbTimeSheet>,
  userId: number,
) => {
  if (userId) {
    query = query.andWhere(`ts.UserId = :userId`, { userId });
  }
  return query;
};
export const hasTaskId = (
  query: SelectQueryBuilder<TbTimeSheet>,
  taskId: number,
) => {
  if (taskId) {
    query = query.andWhere(`ts.TaskId = :taskId`, { taskId });
  }
  return query;
};
export const hasProjectId = (
  query: SelectQueryBuilder<TbTimeSheet>,
  projectId: string,
) => {
  if (projectId) {
    query = query.andWhere(`ts.ProjectId = :projectId`, {
      projectId: `${projectId}`,
    });
  }
  return query;
};
