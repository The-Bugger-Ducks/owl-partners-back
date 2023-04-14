import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreateMeetingCommentDTO } from './dto/createMeetingComment.dto';

@Injectable()
export class MeetingCommentService {
	constructor(private readonly prismaService: PrismaService) {}

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
				// createdAt: 'asc',
				updatedAt: 'desc',
			},
		});
	}

	// update(id: string, comment: UpdateCommentDTO) {
	// 	return this.prismaService.partnerComment.update({
	// 		data: comment,
	// 		where: {
	// 			id,
	// 		},
	// 	});
	// }
}
