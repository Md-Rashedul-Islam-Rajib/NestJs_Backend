import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    TypeOrmModule.forRootAsync({ // database connection settings
      imports: [], // add modules if needed
      inject: [], // add services if needed
      useFactory: () => ({ // factory function to create the configuration object
        type: 'postgres',
        entities: [User],
        autoLoadEntities: true, // automatically load entities
        synchronize: true,
        database: 'nestdb',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
      })
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
