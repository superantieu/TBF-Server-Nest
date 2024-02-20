import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProjectQuery } from 'src/queryParameter/project.query';
import { ProjectResponse } from 'src/responseDto/project.responseDto';
import { ProjectService } from 'src/service/project.service';

@ApiTags('Projects')
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  async getSpecificProject(
    @Query() projectQuery: ProjectQuery,
  ): Promise<ProjectResponse> {
    try {
      console.log('1', projectQuery);
      const data = await this.projectService.getSpecificProjects(projectQuery);
      if (!data) {
        return { result: null, message: 'Project not found' };
      }
      return {
        message: 'Select projects successfully',
        pagination: data.pagination,
        result: data.projects,
      };
    } catch (error) {
      return { result: null, message: 'Error finding project' };
    }
  }

  @Get('/compact')
  async getSpecificCompactProject(): Promise<ProjectResponse> {
    try {
      const data = await this.projectService.getSpecificCompactProjects();
      if (!data) {
        return { result: null, message: 'Project not found' };
      }
      return {
        message: 'Select projects successfully',
        pagination: { count: data.pagination },
        result: data.projects,
      };
    } catch (error) {
      return { result: null, message: 'Error finding project' };
    }
  }
}
