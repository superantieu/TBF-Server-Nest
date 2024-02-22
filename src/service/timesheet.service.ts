import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import { TbTimeSheet } from 'src/entity/timesheet.entity';
import { TimeSheetQuery } from 'src/queryParameter/timeSheet.query';
import { TimeSheetDto } from 'src/dto/timesheet.dto';
import {
  hasProjectId,
  hasTaskId,
  hasUserId,
} from 'src/extensionQuery/timesheet.extension';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectRepository(TbTimeSheet)
    private readonly timesheetRepository: Repository<TbTimeSheet>,
  ) {}

  async getUserTimeSheets(
    timesheetQuery: TimeSheetQuery,
  ): Promise<{ timesheet: TbTimeSheet[] | null; total: number }> {
    try {
      const { monthYear, userId, taskId, projectId } = timesheetQuery;
      if (!monthYear) return { timesheet: null, total: null };
      let query = this.timesheetRepository
        .createQueryBuilder('ts')
        .select('ts')
        .where(`ts.TSDate like :monthYear`, { monthYear: `%${monthYear}%` });
      query = hasUserId(query, userId);
      query = hasTaskId(query, taskId);
      query = hasProjectId(query, projectId);
      const [timesheet, totalCount] = await query.getManyAndCount();
      console.log('query', query.getSql());
      return {
        timesheet,
        total: totalCount,
      };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  async getUserTimeSheet(
    userId: number,
    timesheetQuery: TimeSheetQuery,
  ): Promise<{ timesheet: TbTimeSheet[] | null; total: number }> {
    try {
      const { date } = timesheetQuery;
      const query = this.timesheetRepository
        .createQueryBuilder('ts')
        .select('ts')
        .where(`ts.UserId = :userId`, { userId })
        .andWhere(`ts.TSDate >= :date`, { date: `${date}` })
        .andWhere(`ts.TSDate <= :date`, { date: `${date}` });

      const [timesheet, totalCount] = await query.getManyAndCount();
      console.log('ts', query.getSql());

      return { timesheet, total: totalCount };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async selectUserTimeSheet(
    timesheetQuery: TimeSheetQuery,
  ): Promise<{ timesheet: TimeSheetDto[] | null; total: number }> {
    try {
      const { projectId } = timesheetQuery;
      if (!projectId) {
        return null;
      }
      let query = this.timesheetRepository
        .createQueryBuilder('TS')
        .leftJoin('TS.user', 'U')
        .select([
          'TS.Id',
          'TS.TaskId',
          'TS.ProjectId',
          'TS.UserId',
          'TS.UserDiscipline',
          'TS.TSHour',
          'U.FullName',
        ])
        .where('TS.ProjectId = :projectId', { projectId });
      const [timesheet, totalCount] = await query.getManyAndCount();
      console.log('time', query.getSql());
      const timeSheetDto = plainToInstance(TimeSheetDto, timesheet);
      return { timesheet: timeSheetDto, total: totalCount };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
