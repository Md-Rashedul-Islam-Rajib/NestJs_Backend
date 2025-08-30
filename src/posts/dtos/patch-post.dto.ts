
import { CreatePostDto } from "./create-post.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class PatchPostDto extends PartialType(CreatePostDto) {
    @ApiProperty({ description: 'ID of the post', example: '123' })
    id: number;
}