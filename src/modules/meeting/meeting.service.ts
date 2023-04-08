import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { UpdateMeetingDTO } from './dto/updateMeeting.dto';
import { CreateMeetingDTO } from './dto/createMeeting.dto';

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
				id,
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

	async findByPartnerId(id: string) {
		return this.prismaService.meeting.findMany({
			where: {
				partnerId: id
			},
			orderBy: {
				meetingDateTime: 'asc'
			}
		});
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
