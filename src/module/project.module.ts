import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from 'src/controller/project.controller';
import { TbProject } from 'src/entity/project.entity';
import { ProjectService } from 'src/service/project.service';
import { TimeSheetModule } from './timesheets.module';
import { TaskModule } from './tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([TbProject]), TimeSheetModule, TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
