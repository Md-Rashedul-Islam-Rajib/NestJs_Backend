import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamsDto } from './../dtos/getUserParams.dto';
import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
    ConfigService,    // ConfigType
} from '@nestjs/config';
import { CreateManyProvider } from './create-many.provider';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByGoogleIdProvider } from './find-user-by-google-id.provider';
import { CreateUserByGoogleProvider } from './create-user-by-google.provider';
import { GoogleUser } from '../interface/googleUser.interface';
/**
 * class to connect users tables and perform business logic
 */
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, // using repository pattern


        private readonly createManyUser : CreateManyProvider,
        private readonly createUserByGoogle : CreateUserByGoogleProvider,

        /**
         * module configuration for profile or similar things
         */
        // @Inject(profileConfig.KEY)
        //     private readonly profileConfiguration : ConfigType<typeof profileConfig>
        @Inject()
        private readonly configService: ConfigService, // using config service for accessing env variables

        private readonly createUserProvider: CreateUserProvider,
        private readonly findUserByEmailProvider: FindUserByEmailProvider,
        private readonly findUserByGoogleIdProvider: FindUserByGoogleIdProvider,

        @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService // dependency injection
) { }

 public async createUser(createUserDto: CreateUserDto): Promise<User> {
   return this.createUserProvider.createUser(createUserDto)
    }   
    
    /**
     * find all users with optional pagination and filtering
     * @param params : params to filter users
     * @param limit : number of users per page
     * @param page : page number
     * @returns : list of users with metadata
     */
    public findAllUsers(
        params: GetUserParamsDto,
        limit?: number,
        page?: number,
    ) {
        // const isAuthenticated = this.authService.isAuthenticated("sample_token_123");
        const data = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ];
        return {
            data,
            meta: {
                limit,
                page,
                total: data.length
            },
            filterUsed: params
        };
    }

/**
 * find specific user by id
 * @param id : user id
 * @returns : user object
 */

    public async findUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } }); 
        if (!user) {
            throw new BadRequestException("User with this id is not exists.")
        }
        return user;
    }

    public async createMany(createManyUserDto: CreateManyUserDto) {
        return await this.createManyUser.createMany(createManyUserDto)
    }

    public async findUserByEmail(email: string) {
        return this.findUserByEmailProvider.findUserByEmail(email);
    }
    public async findUserByGoogleId(googleId: string) {
        return this.findUserByGoogleIdProvider.findUserByGoogleId(googleId)
    }

    public async createUserByGoogleId(googleUser: GoogleUser) {
        return this.createUserByGoogle.createGoogleUser(googleUser)
    }
}