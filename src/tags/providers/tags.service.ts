import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from './../dtos/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    public async crateTag( createTagDto: CreateTagDto ): Promise<Tag> {
     const tag = this.tagRepository.create(createTagDto);
     return await this.tagRepository.save(tag);
    }

    public async findAllTags(tags: number[]): Promise<Tag[]> {
        return await this.tagRepository.find({
            where: {
                id: In(tags),
            }
        });
    }


    public async delete(id: number) {
        await this.tagRepository.delete(id);
        return "tags deleted successfully"
    }

}
