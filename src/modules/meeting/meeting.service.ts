import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { UpdateMeetingDTO } from './dto/updateMeeting.dto';
import { CreateMeetingDTO } from './dto/createMeeting.dto';
import { getCurrentBrTimezone } from 'src/utils/getCurrentBrTimezone';

@Injectable()
export class MeetingService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(meeting: CreateMeetingDTO) {
		return this.prismaService.meeting.create({
			data: meeting,
		});
	}

	async findAll() {
		return this.prismaService.meeting.findMany({
			orderBy: {
				createdAt: 'asc',
			},
			include: {
				Partner: {
					select: {
						id: true,
						name: true,
						email: true,
						phoneNumber: true,
						status: true
					}
				}
			}
		});
	}


	async findById(id: string) {
		return this.prismaService.meeting.findFirstOrThrow({
			where: {
				id
			},
			select: {
				id: true,
				title: true,
				description: true,
				meetingDateTime: true,
				Partner: {
					select: {
						id: true,
						name: true,
						email: true,
						phoneNumber: true,
						status: true
					}
				}
			},
		});
	}

	async findByPartnerId(id: string) {
		const upcomingMeetings = await this.prismaService.meeting.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				meetingDateTime: true,
			},
			where: {
				meetingDateTime: {
					gt: getCurrentBrTimezone()
				},
				partnerId: id
			},
			orderBy: { meetingDateTime: 'asc' }
		});

		const pastMeetings = await this.prismaService.meeting.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				meetingDateTime: true,
			},
			where: {
				meetingDateTime: {
					lt: getCurrentBrTimezone()
				},
				partnerId: id
			},
			orderBy: { meetingDateTime: 'asc' }
		});

		return { upcomingMeetings, pastMeetings }
	}

	update(id: string, meeting: UpdateMeetingDTO) {
		return this.prismaService.meeting.update({
			data: meeting,
			where: {
				id,
			},
		});
	}

	delete(id: string) {
		return this.prismaService.meeting.delete({
			where: {
				id: id,
			},
		});
	}
}
