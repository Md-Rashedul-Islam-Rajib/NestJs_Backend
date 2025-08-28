import { IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class GetPostParamsDto {
  @IsOptional()
  @IsNotEmpty()
    id?: number;
    
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  limit?: string;
  
    @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  page?: string;
}