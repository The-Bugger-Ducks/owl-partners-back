import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreatePartnerDTO } from './dto/createPartner.dto';
import { UpdatePartnerDTO } from './dto/updatePartner.dto';
import { User } from '@prisma/client';

@Injectable()
export class PartnerService {
	constructor(private readonly prismaService: PrismaService) { }

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


	async findById(id: string) {
		return await this.prismaService.partner.findFirst({ where: { id } });
	}


	async listMergedComments(id: string) {
		const partner = await this.prismaService.partner.findUnique({ where: { id } });
		if (!partner) return null

		const partnerComments = await this.prismaService.partnerComment.findMany({
			select: {
				id: true,
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: true,
			},
			where: { partnerId: id },
			orderBy: { updatedAt: 'desc' }
		});

		const meetingComments = await this.prismaService.meetingComment.findMany({
			select: {
				id: true,
				Meeting: {
					select: {
						title: true
					}
				},
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: true,
			},
			where: {
				Meeting: {
					partnerId: id
				}
			},
			orderBy: { updatedAt: 'desc' }
		})


		let annotations = [...meetingComments, ...partnerComments];

		// ordem do mais recente para o mais antigo
		annotations.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			if (a.createdAt < b.createdAt) return 1;
			return 0;
		});

		return { partner, annotations }
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
}
