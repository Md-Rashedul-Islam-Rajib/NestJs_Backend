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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import envValidation from './config/env.validation';
import { Post } from './posts/post.entity';


const ENV = process.env.NODE_ENV; // grab the environment what nodejs currently use
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    // ConfigModule.forFeature(profileConfig), // using for module configuration
    ConfigModule.forRoot({
      isGlobal: true, // use config module for hide credentials
      // envFilePath: ['.env.development'], // tell the app what env it use
      envFilePath: !ENV ? '.env' : `.env.${ENV}`, // use the environment variable dynamically
      load: [appConfig, databaseConfig],
      validationSchema: envValidation // validate env variables
    }),
    TypeOrmModule.forRootAsync({
      // database connection settings
      imports: [ConfigModule], // add modules if needed
      inject: [ConfigService], // add services if needed
      useFactory: (configService: ConfigService) => ({
        // factory function to create the configuration object
        type: 'postgres' as const,
        entities: [User,Post],
        autoLoadEntities: configService.get('database.autoLoadEntities'), // automatically load entities
        synchronize: configService.get('database.synchronize'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        port: parseInt(
          configService.get<string>('DATABASE_PORT') || '5432',
          10,
        ),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
