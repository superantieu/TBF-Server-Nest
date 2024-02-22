import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbProject } from './project.entity';

@Entity('tbTask')
export class TbTask {
  @PrimaryGeneratedColumn()
  TaskId: number;
  @Column()
  ProjectId: string;
  @Column()
  TaskCode: string;
  @Column()
  TaskDiscipline: string;
  @Column()
  TaskType: string;
  @Column()
  SubTask: string;
  @Column()
  Name: string;
  @Column()
  Detail: string;
  @Column()
  UserIds: string;
  @Column()
  StartDate: string;
  @Column()
  TargetDate: string;
  @Column()
  FinishedDate: string;
  @Column()
  Hours: number;
  @Column()
  Modified: boolean;
  @Column()
  AutoLoad: string;
  @ManyToOne(() => TbProject, (project) => project.tasks)
  @JoinColumn({ name: 'ProjectId' })
  project: TbProject;
}
