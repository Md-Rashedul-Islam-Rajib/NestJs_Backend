import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tags')
    @ApiTags('Tags') // grouping the endpoints in swagger ui
export class TagsController {

    constructor(
        private readonly tagsService: TagsService,
    ) {}


    @Post()
    @ApiOperation({ summary: 'Create a new tag' })
        @ApiResponse({ status: 201, description: 'The tag has been successfully created.' })
        @ApiResponse({ status: 400, description: 'Bad Request.' })
    public create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.crateTag(createTagDto);
    }

    @Delete()
    public delete(@Query('id, ParseIntPipe') id: number) {
        return this.tagsService.delete(id)
    }
}
