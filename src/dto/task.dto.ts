import { Exclude, Expose, Transform } from 'class-transformer';

export class TaskDto {
  @Expose()
  TaskId: number;
  @Expose()
  ProjectId: string;
  @Expose()
  TaskCode: string;
  @Expose()
  TaskDiscipline: string;
  @Expose()
  TaskType: string;
  @Expose()
  SubTask: string;
  @Expose()
  Name: string;
  @Expose()
  Detail: string;
  @Expose()
  UserIds: string;
  @Expose()
  StartDate: string;
  @Expose()
  TargetDate: string;
  @Expose()
  FinishedDate: string;
  @Expose()
  Hours: number;
  @Expose()
  Modified: boolean;
  @Expose()
  AutoLoad: string;
  @Expose()
  @Transform(({ obj }) => obj.project.ProjectName)
  ProjectName: string;
  @Expose()
  @Transform(({ obj }) => obj.project.CompletedDate)
  CompletedDate: string;

  @Exclude()
  project: any;
}
