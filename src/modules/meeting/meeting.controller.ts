import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MeetingService } from './meeting.service';
import { CreateMeetingDTO } from './dto/createMeeting.dto';
import { UpdateMeetingDTO } from './dto/updateMeeting.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/has-roles.decorator';
import { RoleEnum } from '../user/enums/role.enum';

@Controller('/meetings')
@ApiTags('meetings')
export class MettingController {
	constructor(private meetingService: MeetingService) { }

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Post()
	async createPartner(@Body() meetingData: CreateMeetingDTO) {
		return this.meetingService.create(meetingData);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	async meetings() {
		return this.meetingService.findAll();
	}

	@UseGuards(AuthGuard('jwt'))
	@Get(':id')
	async meetingById(@Param('id') id: string) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		return this.meetingService.findById(id);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('partner/:partnerId')
	async meetingsByPartner(@Param('partnerId') partnerId: string) {
		return this.meetingService.findByPartnerId(partnerId);
	}

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Put('/:id')
	async updateMeeting(@Param('id') id: string, @Body() dataToUpdate: UpdateMeetingDTO) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		const meetingUpdated = await this.meetingService.update(id, dataToUpdate);
		return {
			meeting: meetingUpdated,
			message: 'Dados da Reunião Atualizado com sucesso.',
		};
	}

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Delete('/:id')
	async deleteMeeting(@Param('id') id: string) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		await this.meetingService.delete(id);
		return { message: 'Reunião deletada com sucesso.' };
	}
}
