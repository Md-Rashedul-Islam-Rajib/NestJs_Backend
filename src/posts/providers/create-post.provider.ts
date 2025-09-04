import { Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {
    constructor(
    @InjectRepository(Post) 
        private readonly postRepository: Repository<Post>, // using repository pattern
        private readonly usersService: UsersService, // dependency injection
        private readonly tagsService: TagsService, // dependency injection
        private readonly metaOptionsService: MetaOptionsService,
){}

      public async createPost(createPostDto: CreatePostDto,user:IActiveUser): Promise<Post> {
        const existingPost = await this.postRepository.findOne({
          where: { title: createPostDto.title },
        });
    
        if (existingPost) {
          throw new ConflictException('Post with this title already exists');
        }
    
        const author = await this.usersService.findUserById(user.sub);
        // Create post entity manually to ensure proper typing
    if (!author) {
          throw new NotFoundException('Author not found');
        }
    
        const tags = await this.tagsService.findAllTags(createPostDto.tags || []);
    
        if (tags.length !== (createPostDto.tags || []).length) {
          throw new NotFoundException('One or more tags not found');
        }
        const newPost = new Post();
        newPost.title = createPostDto.title;
        newPost.postType = createPostDto.postType;
        newPost.postStatus = createPostDto.postStatus;
        newPost.slug = createPostDto.slug;
        newPost.content = createPostDto.content;
    newPost.tags = tags; 
        newPost.publishOn = createPostDto.publishOn;
        newPost.author = author; 
        // Handle meta option if provided
        if (createPostDto.metaOption) {
          const metaOption = await this.metaOptionsService.create(
            createPostDto.metaOption,
          );
          newPost.metaOption = metaOption;
        }
    
        return this.postRepository.save(newPost);
      }
}
