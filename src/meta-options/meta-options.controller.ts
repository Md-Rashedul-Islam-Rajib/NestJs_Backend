import { MetaOptionsService } from './providers/meta-options.service';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreatePostMetaOptionDto } from './dtos/create-postMeta-Option.dto';

@Controller('meta-options')
export class MetaOptionsController {

    constructor(
        private readonly MetaOptionsService: MetaOptionsService,
    ) {}
    @Post()
    public create(@Body() CreatePostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.MetaOptionsService.create(CreatePostMetaOptionDto);
    }

    @Delete(':id')
    public deleteMetaOption(id: number) {
    return this.MetaOptionsService.deleteMetaOption(id);
    }
}
