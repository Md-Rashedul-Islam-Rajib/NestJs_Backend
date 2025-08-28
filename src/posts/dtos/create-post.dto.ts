import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    
    @IsString()
    @IsNotEmpty() 
        @MinLength(6)
    title: string;

    @IsString()
    @IsNotEmpty()
        @MinLength(10)
    content: string;
}