import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TimeSheetQuery } from 'src/queryParameter/timeSheet.query';
import { TimeSheetResponse } from 'src/responseDto/timesheet.responseDto';
import { TimeSheetService } from 'src/service/timesheet.service';

@ApiTags('TimeSheets')
@Controller('api/timesheet')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}
  @Get()
  async findUserTimeSheet(
    @Query() timesheetQuery: TimeSheetQuery,
  ): Promise<TimeSheetResponse> {
    try {
      const data = await this.timeSheetService.selectUserTimeSheet(
        timesheetQuery,
      );
      if (!data) {
        return { message: 'Bad request', result: null };
      }
      return {
        message: 'Get User TimeSheet successfully!',
        total: data.total,
        result: data.timesheet,
      };
    } catch (error) {
      return {
        message: 'Error get user timesheet',
        result: null,
      };
    }
  }
}
