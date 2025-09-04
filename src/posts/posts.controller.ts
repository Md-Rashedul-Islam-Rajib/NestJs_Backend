import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostsDto } from './dtos/getPosts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './providers/posts.service';

@Controller('posts')
@ApiTags('Posts') // grouping the endpoints in swagger ui
export class PostsController {
  constructor(
    private readonly postsService: PostsService, // dependency injection
  ) {}

  @Get()
  public getAllPosts(@Query() postQuery: GetPostsDto) {
    console.log(postQuery);
    return this.postsService.findAllPosts(postQuery);
  }

  @ApiResponse({
    status: 200,
    description: 'The post has been successfully fetched.',
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @Get('/:id')
  public getPostById(@Param('id') id: string) {
    return this.postsService.findPostById(id);
  }

  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: IActiveUser,
  ) {
    console.log(createPostDto);
    return this.postsService.createPost(createPostDto,user);
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
    return this.postsService.updatePost(patchPostDto);
  }
}
