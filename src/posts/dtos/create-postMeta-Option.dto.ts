import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionDto { 
    @IsString()
    @IsNotEmpty()
        @ApiProperty({ description: 'Key of the meta option', example: 'description' })
    key: string;
    @IsNotEmpty()
        @ApiProperty({ description: 'Value of the meta option', example: 'This is a sample post description' })
    value: string;
}