import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaOptionsService } from "src/meta-options/providers/meta-options.service";
import { TagsService } from "src/tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>, // using repository pattern
    private readonly usersService: UsersService, // dependency injection
    private readonly tagsService: TagsService, // dependency injection
    private readonly metaOptionsService: MetaOptionsService,
  ) {}
  public async findAllPosts() {
    return this.postRepository.find({ relations: ['metaOption'] }); // fetch all posts with their meta options
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

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const existingPost = await this.postRepository.findOne({
      where: { title: createPostDto.title },
    });

    if (existingPost) {
      throw new ConflictException('Post with this title already exists');
    }

    const author = await this.usersService.findUserById(createPostDto.authorId);
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