import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService // dependency injection
    ) { }
    


    public login(email: string, password: string, id: string) {
     const user = this.usersService.findUserById(1); // using UsersService method
        return {
            token: "sample_token_123",
        }
    }


    public isAuthenticated(token: string) {
        return token === "sample_token_123";
    }
}
