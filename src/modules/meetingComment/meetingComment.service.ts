import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database';

import { CreateMeetingCommentDTO } from './dto/createMeetingComment.dto';
import { UpdateMeetingCommentDTO } from './dto/updateMeetingComment.dto';

@Injectable()
export class MeetingCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(comment: CreateMeetingCommentDTO) {
		return this.prismaService.meetingComment.create({
			data: comment,
		});
	}

	async listCommentsByMeeting(id: string) {
		return await this.prismaService.meetingComment.findMany({
			where: {
				meetingId: id,
			},
			select: {
				id: true,
				meetingId: true,
				userId: true,
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: {
					select: {
						name: true,
						lastName: true,
						email: true,
					},
				},
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
	}

	async findById(id: string) {
		return this.prismaService.meetingComment.findFirst({
			where: {
				id,
			},
			select: {
				User: {
					select: {
						id: true,
					},
				},
			},
		});
	}

	async update(id: string, comment: UpdateMeetingCommentDTO) {
		return this.prismaService.meetingComment.update({
			data: comment,
			where: {
				id,
			},
		});
	}
}
