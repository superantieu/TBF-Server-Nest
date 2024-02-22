import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskQuery {
  @ApiProperty({ required: true, type: String })
  @IsString()
  searchTerm: string;
}
