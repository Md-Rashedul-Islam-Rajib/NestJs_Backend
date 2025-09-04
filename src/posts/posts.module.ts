import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreateUserProvider, CreatePostProvider],
  imports: [
    PaginationModule,
    UsersModule, // import UsersModule to use UsersService in PostsService
    MetaOptionsModule, // import MetaOptionsModule to use MetaOptionsService in PostsService
TagsModule, // import TagsModule to use TagsService in PostsService
    TypeOrmModule.forFeature([Post,MetaOption]) // import Post and meta optio entity for TypeORM
  ] 
})
export class PostsModule {}
