

import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { IActiveUser } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokenProvider {
    constructor(
      
        private readonly jwtService: JwtService,
          private readonly generateTokenProvider: GenerateTokenProvider,
        @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
        @Inject(jwtConfig.KEY)
          private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        
    ) { }
    public async refreshToken(refreshTokenDto: RefreshTokenDto) {

        try {
        const { sub } = await this.jwtService.verifyAsync<
          Pick<IActiveUser, 'sub'>
        >(refreshTokenDto.refreshToken, {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        });

        const user = await this.usersService.findUserById(sub);
        return await this.generateTokenProvider.generateTokens(user);    
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        
    }
}
