import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbUser } from './user.entity';
import { TbProject } from './project.entity';

@Entity('tbTimeSheet')
export class TbTimeSheet {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  TaskId: number;
  @Column()
  ProjectId: string;
  @Column()
  UserId: number;
  @Column()
  UserDiscipline: string;
  @Column()
  TSHour: number;

  @ManyToOne(() => TbUser, (user) => user.timeSheets)
  @JoinColumn({ name: 'UserId' })
  user: TbUser;
  @ManyToOne(() => TbProject, (project) => project.timeSheets)
  @JoinColumn({ name: 'ProjectId' })
  project: TbProject;
}
