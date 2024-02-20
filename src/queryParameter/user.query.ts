import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQuery {
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  pageNumber?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  employed?: number;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  discipline?: string;
}
