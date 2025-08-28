import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService, // dependency injection
    ){}

    @Get()
    public getAllPosts() {
        return this.postsService.findAllPosts();
    }

    @Get('/:id')
    public getPostById(@Param('id') id: string) {
        return this.postsService.findPostById(id);
    }

    @Post()
    public createPost() {
        return this.postsService.createPost('New Post', 'This is the content of the new post.');
    }

    @Patch()
    public updatePost() {
        return this.postsService.updatePost(1, 'Updated Post', 'This is the updated content of the post.');
    }
}
