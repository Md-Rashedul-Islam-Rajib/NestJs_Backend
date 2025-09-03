import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider, //abstract class
      useClass: BcryptProvider, // use abstract class
    },
    SignInProvider,
  ],
  imports: [
    forwardRef(() => UsersModule),  // import UsersModule to use UsersService in AuthService
ConfigModule.forFeature(jwtConfig),
JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  exports: [AuthService, HashingProvider, SignInProvider], // export if needed in other modules
})
export class AuthModule {}
