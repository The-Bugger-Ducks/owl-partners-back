import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PartnerService } from './partner.service';
import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { PartnerStatus } from './enums/PartnerStatus';
import { PartnerClassification } from './enums/PartnerClassification';
import { HasRoles } from '../auth/decorators/has-roles.decorator';
import { RoleEnum } from '../user/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('/partners')
@ApiTags('partner')
export class PartnerController {
	constructor(private partnerService: PartnerService) { }

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Post()
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


	@UseGuards(AuthGuard('jwt'))
	@Get(':id')
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

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Put('/:id')
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

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Delete('/:id')
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
