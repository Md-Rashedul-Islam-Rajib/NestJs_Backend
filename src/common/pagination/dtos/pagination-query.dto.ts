import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: false, default: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) 
  limit?: number = 10;

  @ApiProperty({
    required: false,
    example: 'name:ASC,createdAt:DESC',
    description: 'Sort fields in format: field:direction,field:direction',
  })
  @IsOptional()
  @IsString()
  sort?: string;
}
