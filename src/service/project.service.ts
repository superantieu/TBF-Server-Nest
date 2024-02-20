import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TbProject } from 'src/entity/project.entity';
import { TbTask } from 'src/entity/task.entity';
import { TbTimeSheet } from 'src/entity/timesheet.entity';
import { ProjectQuery } from 'src/queryParameter/project.query';
import { paginationFc } from 'src/utility/pagination.utility';
import {
  hasChooseProject,
  hasMember,
  hasProjectId,
  hasSearchTerm,
  isComplete,
} from 'src/extensionQuery/project.extension';
import { dataSource } from 'src/data-source';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(TbProject)
    private readonly projectRepository: Repository<TbProject>,
    @InjectRepository(TbTask)
    private readonly taskRepository: Repository<TbTask>,
    @InjectRepository(TbTimeSheet)
    private readonly timesheetRepository: Repository<TbTimeSheet>,
  ) {}
  async getSpecificProjects(
    projectQuery: ProjectQuery,
  ): Promise<{ projects: TbProject[]; pagination: {} }> {
    try {
      const {
        discipline,
        isCompleted,
        projectId,
        searchTerm,
        member,
        pageNumber,
        pageSize,
      } = projectQuery;
      let { chooseProject, sortColumn } = projectQuery;
      const number = pageNumber || 1;
      const size = pageSize || 10;
      chooseProject = chooseProject ? JSON.parse(chooseProject) : undefined;
      let sortOrder: 'ASC' | 'DESC' = 'ASC';

      if (sortColumn && sortColumn.toLowerCase().endsWith('desc')) {
        sortOrder = 'DESC';
        sortColumn = sortColumn.slice(0, -5);
      }

      console.log('sort', sortColumn, sortOrder);
      let query;

      const discipQuery = this.projectRepository
        .createQueryBuilder('p')
        .select([
          'p.ProjectName',
          'p.ProjectId',
          'p.StartDate',
          'p.TargetDate',
          'p.CompletedDate',
          'p.TotalHours',
          'p.FloorAreas',
          'p.ListMember',
          'p.ListLeader',
          'p.ListManager',
        ])
        .orderBy('p.ProjectId', 'ASC')
        .skip(size * (number - 1))
        .take(size)
        .where((mainQuery) => {
          const subQuery = this.taskRepository
            .createQueryBuilder('t')
            .where(`t.TaskDiscipline = '${discipline}'`)
            .andWhere('t.ProjectId = p.ProjectId');
          return `EXISTS(${subQuery.getQuery()})`;
        });

      let normalQuery = this.projectRepository
        .createQueryBuilder('p')
        .select([
          'p.ProjectId',
          'p.ProjectName',
          'p.StartDate',
          'p.TargetDate',
          'p.CompletedDate',
          'p.TotalHours',
          'p.Location',
          'p.Size',
          'p.Difficulty',
          'p.FloorAreas',
          'p.ListMember',
          'p.ListLeader',
          'p.ListManager',
          'SUM(t.Tshour) AS UsedHours',
        ])
        .innerJoin('tbTimeSheet', 't', 't.ProjectId = p.ProjectId')
        .where(`p.ProjectName != 'LEAVE'`)
        .skip(size * (number - 1))
        .take(size);
      if (sortColumn) {
        normalQuery = normalQuery.orderBy(`p.${sortColumn}`, sortOrder);
      } else {
        normalQuery = normalQuery.orderBy(`p.ProjectId`, sortOrder);
      }

      normalQuery = isComplete(normalQuery, +isCompleted);
      normalQuery = hasProjectId(normalQuery, projectId);
      normalQuery = hasMember(normalQuery, member);
      normalQuery = hasSearchTerm(normalQuery, searchTerm);
      normalQuery = hasChooseProject(normalQuery, chooseProject);
      normalQuery = normalQuery
        .groupBy('p.ProjectId')
        .addGroupBy('p.ProjectName')
        .addGroupBy('p.StartDate')
        .addGroupBy('p.TargetDate')
        .addGroupBy('p.CompletedDate')
        .addGroupBy('p.TotalHours')
        .addGroupBy('p.Location')
        .addGroupBy('p.Size')
        .addGroupBy('p.Difficulty')
        .addGroupBy('p.FloorAreas')
        .addGroupBy('p.ListMember')
        .addGroupBy('p.ListLeader')
        .addGroupBy('p.ListManager');

      discipline ? (query = discipQuery) : (query = normalQuery);

      console.log('project', query.getSql());
      const [projects, totalProjects] = await query.getManyAndCount();

      const pagination = paginationFc(number, size, totalProjects);

      //add some field
      for (let i = 0; i < projects.length; i++) {
        //Count Tasks
        const taskQuery = this.taskRepository
          .createQueryBuilder('t')
          .select('COUNT(*)', 'TaskCount')
          .where(`t.ProjectId = '${projects[i]['ProjectId']}'`);

        const taskCount = await taskQuery.getRawOne();

        //Filter Members
        const userHoursQuery = this.timesheetRepository
          .createQueryBuilder('ts')
          .select([
            'u.UserId as UserId',
            'u.FullName as FullName',
            'u.Discipline as Discipline',
            'u.Jobtitle',
            'SUM(ts.TSHour) AS UserHours',
          ])
          .innerJoin('TbUser', 'u', 'ts.UserId = u.UserId')
          .where(`ts.ProjectId = '${projects[i]['ProjectId']}'`)
          .groupBy('u.UserId,u.FullName,u.Discipline, u.JobTitle');

        const userHours = await userHoursQuery.getRawMany();

        //Return projects
        projects[i]['Tasks'] = taskCount['TaskCount'];
        projects[i]['FilterMembers'] = userHours;
      }

      return { projects, pagination };
    } catch (error) {
      console.log('Error finding project');
      throw error;
    }
  }

  async getSpecificCompactProjects(): Promise<{
    projects: TbProject[];
    pagination: {};
  }> {
    try {
      const query = this.projectRepository
        .createQueryBuilder('p')
        .select(['p.ProjectName', 'p.ProjectId'])
        .where('p.CompletedDate IS NULL')
        .andWhere(`p.ProjectName !='LEAVE'`);
      const [compactProject, totalProjects] = await query.getManyAndCount();
      console.log('compact project', query.getSql());
      return { projects: compactProject, pagination: totalProjects };
    } catch (error) {
      console.log('Error finding project');
      throw error;
    }
  }
}
