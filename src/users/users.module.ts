import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreateManyProvider } from './providers/create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateManyProvider,
    CreateUserProvider,
    FindUserByEmailProvider,
    // { // using guard globally to this module
    //   provide: APP_GUARD, // tell nestjs for you want to use guard
    //   useClass:AccessTokenGuard // tell nestjs which guard you want to use
    // }
  ],
  exports: [UsersService], // export UsersService to be used in other modules
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]), // import User entity for TypeORM
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider())
  ],
})
export class UsersModule {}
