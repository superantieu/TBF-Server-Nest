import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import { TbTimeSheet } from 'src/entity/timesheet.entity';
import { TimeSheetQuery } from 'src/queryParameter/timeSheet.query';
import { TimeSheetDto } from 'src/dto/timesheet.dto';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectRepository(TbTimeSheet)
    private readonly timesheetRepository: Repository<TbTimeSheet>,
  ) {}

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
