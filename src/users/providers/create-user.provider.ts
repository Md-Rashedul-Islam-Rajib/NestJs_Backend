import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {

    constructor(
        @InjectRepository(User)
                private userRepository: Repository<User>, // using repository pattern
    
        @Inject(forwardRef(() => HashingProvider)) // using forwardRef for circular dependency
        private readonly hashingProvider: HashingProvider
    ) { }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        //  const envVariable = this.configService.get("DB_Url") as string; // accessing env
        //  console.log(envVariable)
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
        const newUser = this.userRepository.create({
            ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password)
        });
            return this.userRepository.save(newUser);
        }
}
