import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
      private readonly jwtService: JwtService,  
@Inject(jwtConfig.KEY)
private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) { }

  public async signIn(singInDto: SignInDto) {
    const user = await this.usersService.findUserByEmail(singInDto.email);
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        singInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare password',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password');
      }
      

      const accessToken = await this.jwtService.signAsync({
          sub: user.id,
          email: user.email
      }, {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn:this.jwtConfiguration.accessTtl
      })

      return {
        accessToken
    };
  }
}
