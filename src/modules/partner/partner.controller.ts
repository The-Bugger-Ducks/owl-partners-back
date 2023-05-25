import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PartnerService } from './partner.service';
import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { PartnerStatus } from './enums/PartnerStatus';
import { PartnerClassification } from './enums/PartnerClassification';

@Controller('/partners')
@ApiTags('partner')
export class PartnerController {
	constructor(private partnerService: PartnerService) { }

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async createPartner(@Body() partnerData: CreatePartnerDTO) {
		return this.partnerService.create(partnerData);
	}

	@Get('/search')
	@UseGuards(AuthGuard('jwt'))
	async findByFilters(@Query() filters: {
		name?: string;
		email?: string;
		status?: PartnerStatus;
		classification?: PartnerClassification;
		disabled?: boolean;
	}): Promise<Prisma.PartnerWhereInput[]> {

		return await this.partnerService.findByFilters(filters);
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async partnerById(@Param('id') id: string) {
		const partnerFound = await this.partnerService.findById(id);
		if (partnerFound === null) throw new NotFoundException('Parceria não encontrada.');

		return this.partnerService.findById(id);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async partners() {
		return this.partnerService.findAll();
	}

	@Get(':partnerId/annotationsHistory')
	@UseGuards(AuthGuard('jwt'))
	@ApiTags('History')
	async listMergedComments(@Param('partnerId') partnerId: string) {
		const partnerFound = await this.partnerService.findById(partnerId);
		if (partnerFound === null) throw new NotFoundException('Parceria não encontrada.');

		return this.partnerService.listMergedComments(partnerId);
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updatePartner(@Param('id') id: string, @Body() dataToUpdate: UpdatePartnerDTO) {
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
	@UseGuards(AuthGuard('jwt'))
	async disablePartner(@Param('id') id: string) {
		const partnerFound = await this.partnerService.findById(id);

		if (partnerFound === null) {
			throw new NotFoundException('Parceria não encontrada.');
		}

		await this.partnerService.deleteUpcomingMeetings(id);
		await this.partnerService.disable(id);

		return { message: 'Parceria desativada com sucesso.' };
	}
}
