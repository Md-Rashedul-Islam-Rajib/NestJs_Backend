import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/provider/mail.service';

@Injectable()
export class CreateUserProvider {

    constructor(
        @InjectRepository(User)
                private userRepository: Repository<User>, // using repository pattern
    
        @Inject(forwardRef(() => HashingProvider)) // using forwardRef for circular dependency
        private readonly hashingProvider: HashingProvider,
        private readonly mailService: MailService
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

        try {
            await this.mailService.sendUserWelcome(newUser)
        } catch (error) {
            throw new RequestTimeoutException(error)
        }
            return this.userRepository.save(newUser);
        }
}
