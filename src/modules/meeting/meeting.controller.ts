import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MeetingService } from './meeting.service';
import { CreateMeetingDTO } from './dto/createMeeting.dto';
import { UpdateMeetingDTO } from './dto/updateMeeting.dto';

@Controller('/meetings')
@ApiTags('meetings')
export class MettingController {
	constructor(private meetingService: MeetingService) { }

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async createPartner(@Body() meetingData: CreateMeetingDTO) {
		return this.meetingService.create(meetingData);
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async meetingById(@Param('id') id: string) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		return this.meetingService.findById(id);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async meetings() {
		return this.meetingService.findAll();
	}

	@Get('partner/:partnerId')
	@UseGuards(AuthGuard('jwt'))
	async meetingsByPartner(@Param('partnerId') partnerId: string) {
		return this.meetingService.findByPartnerId(partnerId);
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateMeeting(@Param('id') id: string, @Body() dataToUpdate: UpdateMeetingDTO) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		const meetingUpdated = await this.meetingService.update(id, dataToUpdate);
		return {
			meeting: meetingUpdated,
			message: 'Dados da Reunião Atualizado com sucesso.',
		};
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteMeeting(@Param('id') id: string) {
		const meetingFound = await this.meetingService.findById(id);

		if (meetingFound === null) throw new NotFoundException('Reunião não encontrada.');

		await this.meetingService.delete(id);
		return { message: 'Reunião deletada com sucesso.' };
	}
}
