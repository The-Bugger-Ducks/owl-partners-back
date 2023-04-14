import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MeetingCommentService } from './meetingComment.service';
import { CreateMeetingCommentDTO } from './dto/createMeetingComment.dto';

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

	// @Put('comment/:commentId')
	// @UseGuards(AuthGuard('jwt'))
	// async update(@Param('commentId') commentId: string, @Body() commentData: UpdateCommentDTO) {
	// 	return await this.partnerCommentService.update(commentId, commentData);
	// }
}
