import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionDto } from './create-postMeta-Option.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @ApiPropertyOptional({
    description: 'Tags of the post',
    example: ['nestjs', 'typescript'],
    required: false,
    isArray: true,
  })
  tags?: string[];

  @IsISO8601()
  @ApiProperty({
    description: 'Publish date of the post in ISO 8601 format',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  PublishOn: Date;

  @ApiPropertyOptional({
    description: 'Excerpt of the post',
    example: 'This is a brief excerpt of my first post.',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'This key can be any string identifier for meta options',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'string',
          description: 'This value can be any string value associated with the key',
          example: 'true',
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({
    description: 'Meta options for the post',
    type: [CreatePostMetaOptionDto],
    required: false,
  })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions: CreatePostMetaOptionDto[];
}
