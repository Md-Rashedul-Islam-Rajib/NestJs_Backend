import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // export UsersService to be used in other modules
imports: [forwardRef(()=> AuthModule), 
  TypeOrmModule.forFeature([User]) // import User entity for TypeORM
]
})
export class UsersModule {}
