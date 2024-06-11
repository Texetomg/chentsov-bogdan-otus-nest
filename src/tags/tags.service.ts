import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    await this.tagsRepository.save({
      name: createTagDto.name,
    });
  }

  async findAll() {
    return this.tagsRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.tagsRepository.findOne({ where: { id } });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
