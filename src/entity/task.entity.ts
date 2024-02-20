import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbTask')
export class TbTask {
  @PrimaryGeneratedColumn()
  TaskId: number;
  @Column()
  ProjectId: string;
  @Column()
  TaskDiscipline: string;
  @Column()
  Name: string;
}
