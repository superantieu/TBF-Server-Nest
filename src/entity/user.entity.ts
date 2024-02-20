import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TbTimeSheet } from './timesheet.entity';

@Entity('tbUser')
export class TbUser {
  @PrimaryGeneratedColumn()
  UserId: number;
  @Column()
  Discipline: string;
  @Column()
  JobTitle: string;

  @Column()
  FullName: string;
  @OneToMany(() => TbTimeSheet, (timeSheet) => timeSheet.user)
  timeSheets: TbTimeSheet[];
}
