import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(()=> UsersModule)], // import UsersModule to use UsersService in AuthService
exports: [AuthService], // export AuthService if needed in other modules
})
export class AuthModule {}
