import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetUserParamsDto {
    @IsOptional()
    @IsInt()
        @Type(() => Number) // to transform the string to number
    id: number | undefined;
//   role?: string;
//   age?: number;
//   limit?: number;
//   offset?: number;
//   page?: number;
}