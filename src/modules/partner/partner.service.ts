import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';

@Injectable()
export class PartnerService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(partner: CreatePartnerDTO) {
    return this.prismaService.partner.create({
      data: partner,
    });
  }

  async findAll() {
    return this.prismaService.partner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByName(name: string) {
    return this.prismaService.partner.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prismaService.partner.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, partner: UpdatePartnerDTO) {
    return this.prismaService.partner.update({
      data: partner,
      where: {
        id,
      },
    });
  }

  disable(id: string) {
    return this.prismaService.partner.update({
      data: {
        disabled: true,
      },
      where: {
        id: id,
      },
    });
  }
}
