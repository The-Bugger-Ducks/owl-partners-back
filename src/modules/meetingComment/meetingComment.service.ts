import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreateMeetingCommentDTO } from './dto/createMeetingComment.dto';
import { UpdateMeetingCommentDTO } from './dto/updateMeetingComment.dto';
import { getCurrentBrDateTimeISO } from 'src/utils/getCurrentBrDateTimeISO';

@Injectable()
export class MeetingCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(comment: CreateMeetingCommentDTO) {
		comment['createdAt'] = getCurrentBrDateTimeISO();
		comment['updatedAt'] = getCurrentBrDateTimeISO();

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
		comment['updatedAt'] = getCurrentBrDateTimeISO();

		return this.prismaService.meetingComment.update({
			data: comment,
			where: {
				id,
			},
		});
	}
}
