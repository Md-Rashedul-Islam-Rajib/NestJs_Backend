import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { IActiveUser } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokenProvider {

    constructor(
        private readonly jwtService: JwtService,
            @Inject(jwtConfig.KEY)
            private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }
    
    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
       return await this.jwtService.signAsync(
            {
              sub: userId,
              ...payload
            },
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: expiresIn,
            },
          );  
    }

    public async generateTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
          this.signToken<Partial<IActiveUser>>(
            user.id,
            this.jwtConfiguration.accessTtl,
            { email: user.email },
          ),
          this.signToken<Partial<IActiveUser>>(
            user.id,
            this.jwtConfiguration.refreshTtl
        )
        ]);    
        return {
    accessToken,refreshToken
}
    }
}

