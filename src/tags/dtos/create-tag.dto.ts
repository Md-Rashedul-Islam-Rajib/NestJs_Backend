import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateTagDto {
    
    @ApiProperty({ example: 'JavaScript', description: 'Name of the tag' })
    @IsString()
    @MinLength(3)
        @IsNotEmpty()
      name: string;
      
    @ApiProperty({ example: 'javascript', description: 'Slug of the tag' })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
        @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens' })
      slug: string;
      
    @ApiPropertyOptional({ example: 'A programming language', description: 'Description of the tag' })
    @IsString()
    @IsOptional()
        description?: string;
      
      @ApiPropertyOptional({ example: '{"key":"value"}', description: 'Schema in JSON format' })
      @IsJSON()
      @IsNotEmpty()
      schema?: string;
      
      
}