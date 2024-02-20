import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TimeSheetQuery {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  projectId: string;
}
