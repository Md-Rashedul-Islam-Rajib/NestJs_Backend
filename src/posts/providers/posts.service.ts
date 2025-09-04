import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaOptionsService } from "src/meta-options/providers/meta-options.service";
import { TagsService } from "src/tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";
import { GetPostsDto } from "../dtos/getPosts.dto";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { CreatePostProvider } from "./create-post.provider";
import { IActiveUser } from "src/auth/interfaces/active-user.interface";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) 
    private readonly postRepository: Repository<Post>, // using repository pattern
    private readonly paginationProvider: PaginationProvider,
    private readonly usersService: UsersService, // dependency injection
    private readonly tagsService: TagsService, // dependency injection
    private readonly metaOptionsService: MetaOptionsService,
    private readonly createPostProvider: CreatePostProvider
  ) {}
  public async findAllPosts(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    return this.paginationProvider.paginatedQuery({
      limit: postQuery.limit ,
      page: postQuery.page
    },
    this.postRepository
    ); 
  }

  public findPostById(id: number | string) {
    const user = this.usersService.findUserById(1); // using UsersService method
    return {
      id,
      user,
      title: 'Sample Post',
      content: 'This is a sample post content.',
    };
  }

  public async createPost(createPostDto: CreatePostDto,user:IActiveUser): Promise<Post> {
   return this.createPostProvider.createPost(createPostDto,user)
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    const tags = patchPostDto.tags ? await this.tagsService.findAllTags(patchPostDto.tags) : null;
    if (!tags) {
    throw new NotFoundException("tags not found")
    }

    const post = await this.postRepository.findOneBy({
      id: patchPostDto.id
    })
    if (!post) {
      throw new NotFoundException("post not found")
    }
    post.title = patchPostDto.title ?? post.title
    post.tags = tags
    // rest of the property here
return await this.postRepository.save(post)

    return;
  }

  public async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // The metaOption will be automatically deleted due to CASCADE
    await this.postRepository.remove(post);
    return { message: 'Post deleted successfully' };
  }
}