import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TimeSheetQuery {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  projectId: string;
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  date: string;
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  userId: number;
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  taskId: number;
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  monthYear: string;
}
