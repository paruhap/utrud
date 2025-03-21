import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.services.create({
      data: createServiceDto
    });
  }

  findAll() {
    return this.prisma.services.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  // update(id: number, updateServiceDto: UpdateServiceDto) {
  //   return `This action updates a #${id} service`;
  // }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.services.update({
      where: { id },
      data:updateServiceDto
    });
  }

  remove(id: number) {
    return this.prisma.services.delete({
      where: { id }
    });
  }
}
