import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { GoogleUser } from '../interface/googleUser.interface';

@Injectable()
export class CreateUserByGoogleProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }
    
    public async createGoogleUser(googleUser:GoogleUser) {
        try {
             this.usersRepository.create(googleUser);
            return await this.usersRepository.save(googleUser)
        } catch (error) {
            throw new ConflictException(error)
        }
    }
}
