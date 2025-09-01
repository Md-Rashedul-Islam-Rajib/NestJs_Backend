import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";

export class CreatePostMetaOptionDto {
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    example: '{"key":"value"}',
    description: 'Meta value in JSON format',
  })
  metaValue: Record<string, any>;
}