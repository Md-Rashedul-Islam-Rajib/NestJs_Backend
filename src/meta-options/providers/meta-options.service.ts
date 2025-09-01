import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionDto } from './../dtos/create-postMeta-Option.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}
  public async create(CreatePostMetaOptionDto: CreatePostMetaOptionDto) {
    let metaOption = this.metaOptionRepository.create(CreatePostMetaOptionDto);
    metaOption = await this.metaOptionRepository.save(metaOption);
    return metaOption;
  }

  public async findMetaOptionById(id: number): Promise<MetaOption | null > {
    const metaOption = this.metaOptionRepository.findOne({ where: { id } });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!metaOption) {
      throw new NotFoundException('Meta option not found');
    } else {
      return metaOption;
    }
  }
  public async deleteMetaOption(id: number) {
    const metaOption = await this.metaOptionRepository.findOne({
      where: { id },
    });

    if (!metaOption) {
      throw new Error('Meta option not found');
    }
    await this.metaOptionRepository.delete(metaOption);
    return { message: 'Meta option deleted successfully' };
  }
}