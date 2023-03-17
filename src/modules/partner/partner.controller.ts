import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PartnerService } from './partner.service';
import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';

@Controller('/partners')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Post()
  async createPartner(@Body() partnerData: CreatePartnerDTO) {
    return this.partnerService.create(partnerData);
  }

  @Get('/search/:name')
  async partnersByName(@Param('name') name: string) {
    return this.partnerService.findByName(name);
  }

  @Get(':id')
  async partnerById(@Param('id') id: string) {
    const partnerFound = await this.partnerService.findById(id);

    if (partnerFound === null) {
      throw new NotFoundException('Parceria não encontrada.');
    }

    return this.partnerService.findById(id);
  }

  @Get()
  async partners() {
    return this.partnerService.findAll();
  }

  @Put('/:id')
  async updatePartner(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdatePartnerDTO,
  ) {
    const partnerFound = await this.partnerService.findById(id);

    if (partnerFound === null) {
      throw new NotFoundException('Parceria não encontrada.');
    }

    const partnerUpdated = await this.partnerService.update(id, dataToUpdate);
    return {
      partner: partnerUpdated,
      message: 'Dados da Parceria Atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async disablePartner(@Param('id') id: string) {
    const partnerFound = await this.partnerService.findById(id);

    if (partnerFound === null) {
      throw new NotFoundException('Parceria não encontrada.');
    }

    await this.partnerService.disable(id);

    return { message: 'Parceria desativada com sucesso.' };
  }
}
