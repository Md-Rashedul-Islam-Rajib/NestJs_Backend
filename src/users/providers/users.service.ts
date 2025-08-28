import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamsDto } from './../dtos/getUserParams.dto';
import { forwardRef, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {

    constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService // dependency injection
) { }

    public findAllUsers(
        params: GetUserParamsDto,
        limit?: number,
        page?: number,
    ) {
        const isAuthenticated = this.authService.isAuthenticated("sample_token_123");
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

    public findUserById(id: number) {
return { id, name: 'John Doe' }; 
    }
}