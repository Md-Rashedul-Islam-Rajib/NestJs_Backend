/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dtos';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
    private oauthClient: OAuth2Client;
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService,
        private readonly generateTokenProvider:GenerateTokenProvider
    ){}

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId,clientSecret)
    }
    
    public async authentication(googleTokenDto: GoogleTokenDto) {
try {
            const loginTicket = await this.oauthClient.verifyIdToken({
              idToken: googleTokenDto.token,
            });

            const {
              email,
              sub: googleId,
              given_name: firstName,
              family_name: lastName,
            } = loginTicket.getPayload();

            const user = await this.usersService.findUserByGoogleId(googleId);
            if (user) {
              return this.generateTokenProvider.generateTokens(user);
            }
            const newUser = await this.usersService.createUserByGoogleId({
              email,
              firstName,
              lastName,
              googleId,
            });
            return this.generateTokenProvider.generateTokens(newUser);
} catch (error) {
throw new UnauthorizedException(error)    
}
    }
}
