import { ApiProperty } from '@nestjs/swagger';

export class ProjectQuery {
  @ApiProperty({ required: false, type: Number })
  pageSize?: number;

  @ApiProperty({ required: false, type: Number })
  pageNumber?: number;

  @ApiProperty({ required: false, type: String })
  discipline?: string;

  @ApiProperty({ required: false, type: String })
  searchTerm?: string;

  @ApiProperty({ required: false, type: Number })
  isCompleted?: number;

  @ApiProperty({ required: false, type: String })
  projectId?: string;

  @ApiProperty({ required: false, type: Number })
  member?: number;

  @ApiProperty({ required: false, type: String })
  sortColumn?: string;

  @ApiProperty({ required: false, type: String })
  chooseProject?: string;
}
