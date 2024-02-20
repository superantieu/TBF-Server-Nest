import { Exclude, Expose, Transform } from 'class-transformer';

export class TimeSheetDto {
  @Expose()
  Id: number;
  @Expose()
  TaskId: number;
  @Expose()
  ProjectId: string;
  @Expose()
  UserId: number;
  @Expose()
  UserDiscipline: string;
  @Expose()
  TSHour: number;
  @Expose()
  @Transform(({ obj }) => obj.user.FullName)
  FullName: string;
  @Exclude()
  user: any;
}
