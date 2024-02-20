import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbProject')
export class TbProject {
  @PrimaryGeneratedColumn()
  ProjectId: string;
  @Column()
  ProjectName: string;
  @Column()
  StartDate: string;
  @Column()
  TargetDate: string;
  @Column()
  CompletedDate: string;
  @Column()
  TotalHours: number;
  @Column()
  Location: string;
  @Column()
  Size: string;
  @Column()
  Difficulty: string;
  @Column()
  FloorAreas: number;
  @Column()
  ListMember: string;
  @Column()
  ListLeader: string;
  @Column()
  ListManager: string;
  @Column()
  Tasks: number;
}
