import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionDto } from '../../meta-options/dtos/create-postMeta-Option.dto';
import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Title of the post', example: 'My First Post' })
  title: string;

  @IsNotEmpty()
  @IsEnum(PostType)
  @ApiProperty({ description: 'Type of the post', example: 'blog' })
  postType: PostType;

  @IsNotEmpty()
  @IsEnum(PostStatus)
  @ApiProperty({ description: 'Status of the post', example: 'draft' })
  postStatus: PostStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Slug of the post', example: 'my-first-post' })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'Content of the post',
    example: 'This is the content of my first post.',
  })
  content: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({
    description: 'Array of tag IDs associated with the post',
    example: [1, 2, 3],
    required: false,
    isArray: true,
  })
  tags?: number[];

  @IsISO8601()
  @ApiProperty({
    description: 'Publish date of the post in ISO 8601 format',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  publishOn?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({
    type: CreatePostMetaOptionDto,
    description: 'Meta options for the post',
    required: false,
  })
  @Type(() => CreatePostMetaOptionDto)
  metaOption: CreatePostMetaOptionDto | null;

  @IsNotEmpty()
  @ApiProperty({ description: 'Author ID of the post', example: 1 })
    @IsInt()
authorId:number;
}
