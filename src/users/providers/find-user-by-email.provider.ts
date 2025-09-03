import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {
        
    }

    public async findUserByEmail(email: string) {
        let user: User|null | undefined = undefined;
        try {
            user = await this.usersRepository.findOneBy({
               email:email
           })
        
       } catch (error) {
           throw new RequestTimeoutException(error, {
         description: 'Could not fetch the user'
     })   
        }
        if (!user) {
            throw new UnauthorizedException('User does not exist')
        }
        return user;
    }
}
