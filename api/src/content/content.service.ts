import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    try {
      return await this.prisma.content.create({
        data: createContentDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.content.findMany();
  }

  async findOne(id: number){
    const content = await this.prisma.content.findUnique({
      where: { id },
    });
    
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    await this.findOne(id); // Проверка существования записи

    try {
      return await this.prisma.content.update({
        where: { id },
        data: updateContentDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number){
    await this.findOne(id); // Проверка существования записи

    try {
      return await this.prisma.content.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
