import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Request,
	UseGuards,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@prisma/client';

import { MeetingCommentService } from './meetingComment.service';

import { CreateMeetingCommentDTO } from './dto/createMeetingComment.dto';
import { UpdateMeetingCommentDTO } from './dto/updateMeetingComment.dto';

@Controller('/meetings')
@ApiTags('partnerComments')
export class MettingCommentController {
	constructor(private meetingCommentService: MeetingCommentService) {}

	@Post('comment')
	@UseGuards(AuthGuard('jwt'))
	async createMeetingComment(@Body() meetingCommentData: CreateMeetingCommentDTO) {
		return this.meetingCommentService.create(meetingCommentData);
	}

	@Get('comment/:meetingId')
	@UseGuards(AuthGuard('jwt'))
	async list(@Param('meetingId') meetingId: string) {
		return await this.meetingCommentService.listCommentsByMeeting(meetingId);
	}

	@Put('comment/:commentId')
	@UseGuards(AuthGuard('jwt'))
	async update(@Param('commentId') commentId: string, @Body() commentData: UpdateMeetingCommentDTO, @Request() req) {
		const user: User = req.user;

		const meetingCommentFound = await this.meetingCommentService.findById(commentId);

		if (meetingCommentFound === null) {
			throw new NotFoundException('Comentário da reunião não encontrado');
		} else if (meetingCommentFound.User.id !== user.id) {
			throw new UnauthorizedException('Somente o usuário que criou o comentário pode editá-la.');
		}

		const meetingCommentUpdated = await this.meetingCommentService.update(commentId, commentData);

		return {
			meetingComment: meetingCommentUpdated,
			message: 'Comentário da reunião Atualizado com sucesso.',
		};
	}
}
