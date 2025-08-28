import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService : UsersService // dependency injection
    ){}
    public findAllPosts() { 

    }

    public findPostById(id: number | string) {
     const user = this.usersService.findUserById(1); // using UsersService method
        return { id,user,title: 'Sample Post', content: 'This is a sample post content.' }; 
    }

    public createPost(title: string, content: string) {
        return { id: 1, title, content };
    }

    public updatePost(id: number, title?: string, content?: string) {
        return { id, title: title || 'Updated Title', content: content || 'Updated Content' };
    }
}