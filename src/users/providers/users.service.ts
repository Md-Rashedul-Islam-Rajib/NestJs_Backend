import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamsDto } from './../dtos/getUserParams.dto';
import { forwardRef, Inject, Injectable } from "@nestjs/common";
/**
 * class to connect users tables and perform business logic
 */
@Injectable()
export class UsersService {

    constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService // dependency injection
) { }

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

    public findUserById(id: number) {
return { id, name: 'John Doe' }; 
    }
}