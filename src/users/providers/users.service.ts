import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamsDto } from './../dtos/getUserParams.dto';
import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
    ConfigService,
    // ConfigType
} from '@nestjs/config';
/**
 * class to connect users tables and perform business logic
 */
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, // using repository pattern

        /**
         * module configuration for profile or similar things
         */
        // @Inject(profileConfig.KEY)
        //     private readonly profileConfiguration : ConfigType<typeof profileConfig>
        @Inject()
        private readonly configService: ConfigService, // using config service for accessing env variables

        @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService // dependency injection
) { }

 public async createUser(createUserDto: CreateUserDto): Promise<User> {
     const envVariable = this.configService.get("DB_Url") as string; // accessing env
     console.log(envVariable)
     const existingUser = await this.userRepository.findOne({
         where:
         {
             email: createUserDto.email
         }
     });
     if (existingUser) {
         throw new BadRequestException('User with this email already exists', {
             description: "user already exist with this email in the database. Please change the email and try again."
         });
     }
     const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
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
}