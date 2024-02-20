import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeSheetController } from 'src/controller/timesheet.controller';
import { TbTimeSheet } from 'src/entity/timesheet.entity';
import { TimeSheetService } from 'src/service/timesheet.service';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TbTimeSheet]), UsersModule],
  exports: [TypeOrmModule.forFeature([TbTimeSheet]), UsersModule],
  providers: [TimeSheetService],
  controllers: [TimeSheetController],
})
export class TimeSheetModule {}
