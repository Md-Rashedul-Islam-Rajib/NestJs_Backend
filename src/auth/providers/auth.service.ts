import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signIn.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenProvider } from './refresh-token.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService, // dependency injection
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider
    ) { }
    


    public async signIn(signInDto:SignInDto) {
     return await this.signInProvider.signIn(signInDto)
    }

    public async refreshToken(refreshTokenDto: RefreshTokenDto) {
        return this.refreshTokenProvider.refreshToken(refreshTokenDto)
    }


    public isAuthenticated(token: string) {
        return token === "sample_token_123";
    }
}
