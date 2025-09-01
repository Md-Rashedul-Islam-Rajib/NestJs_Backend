import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts') // grouping the endpoints in swagger ui
export class PostsController {
    constructor(
        private readonly postsService: PostsService, // dependency injection
    ){}

    @Get()
    public getAllPosts() {
        return this.postsService.findAllPosts();
    }

    @ApiResponse({ status: 200, description: 'The post has been successfully fetched.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
        

    @Get('/:id')
    public getPostById(@Param('id') id: string) {
        return this.postsService.findPostById(id);
    }

    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
        return this.postsService.createPost(createPostDto);
    }

    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto) {
        console.log(patchPostDto);
        return this.postsService.updatePost(1, 'Updated Post', 'This is the updated content of the post.');
    }
}
