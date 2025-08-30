import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    example: 1,
    type: Number,
  }
  )
  @IsOptional()
  @IsInt()
  @Type(() => Number) // to transform the string to number
  id: number | undefined;
  //   role?: string;
  //   age?: number;
  @ApiPropertyOptional({
    description: 'Number of items to return',
    example: 10,
    type: Number,
  }
  )
  @IsOptional()
  @IsInt()
  limit?: number;
  //   offset?: number;
  @IsOptional()
  @IsInt()
  page?: number;
}