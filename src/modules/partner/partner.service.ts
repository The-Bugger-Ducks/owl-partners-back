import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { MeetingService } from '../meeting/meeting.service';

import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';
import { Partner, Prisma } from '@prisma/client';
import { PartnerStatus } from './enums/PartnerStatus';
import { PartnerClassification } from './enums/PartnerClassification';

@Injectable()
export class PartnerService {
	constructor(private readonly prismaService: PrismaService, private meetingService: MeetingService) { }

	async create(partner: CreatePartnerDTO) {
		return this.prismaService.partner.create({
			data: partner,
		});
	}

	async findAll(disabled?: boolean) {
		return this.prismaService.partner.findMany({
			where: {
				disabled: disabled ?? false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async findByName(name: string, disabled?: boolean) {
		return this.prismaService.partner.findMany({
			where: {
				name: { contains: name, mode: 'insensitive' },
				disabled: disabled ?? false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async findByFilters(filters: Partial<Partner>): Promise<Partner[]> {
		console.log(filters);

		const filterMapping: { [key in keyof Partial<Partner>]?: (value: any) => Prisma.PartnerWhereInput } = {
			name: (value) => ({ name: { contains: value, mode: 'insensitive' } }),
			email: (value) => ({ email: { contains: value } }),
			status: (value) => ({ status: { equals: value } }),
			classification: (value) => ({ classification: { equals: value } }),
			disabled: (value) => ({ disabled: { equals: value == 'undefined' ? false : Boolean(JSON.parse(value)) } }),
		};

		const where: Prisma.PartnerWhereInput = {};

		Object.entries(filters).forEach(([field, value]) => {
			const filterCondition = filterMapping[field as keyof Partial<Partner>];
			if (filterCondition && value !== undefined) {
				Object.assign(where, filterCondition(value));
			}
		});

		return this.prismaService.partner.findMany({ where });
	}

	async findById(id: string) {
		return await this.prismaService.partner.findFirst({ where: { id } });
	}

	async listMergedComments(id: string) {
		const partnerComments = await this.prismaService.partnerComment.findMany({
			select: {
				id: true,
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: true,
			},
			where: { partnerId: id },
			orderBy: { updatedAt: 'desc' },
		});

		const meetingComments = await this.prismaService.meetingComment.findMany({
			select: {
				id: true,
				Meeting: {
					select: {
						title: true,
					},
				},
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: true,
			},
			where: {
				Meeting: {
					partnerId: id,
				},
			},
			orderBy: { updatedAt: 'desc' },
		});

		const annotations = [...meetingComments, ...partnerComments];

		// ordem do mais recente para o mais antigo
		return annotations.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			if (a.createdAt < b.createdAt) return 1;
			return 0;
		});
	}

	update(id: string, partner: UpdatePartnerDTO) {
		return this.prismaService.partner.update({
			data: partner,
			where: {
				id,
			},
		});
	}

	disable(id: string) {
		return this.prismaService.partner.update({
			data: {
				disabled: true,
			},
			where: {
				id: id,
			},
		});
	}

	deleteUpcomingMeetings(id: string) {
		return this.meetingService.deleteUpcomingMeetingsByPartnerId(id);
	}
}
