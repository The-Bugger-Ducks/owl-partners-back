import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../database';
import { CreateCommentDTO } from "./dto/createComment.dto";
import { UpdateCommentDTO } from "./dto/updateComment.dto";
import { getCurrentBrDateTimeISO } from "src/utils/getCurrentBrDateTimeISO";

@Injectable()
export class PartnerCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async addComment(comment: CreateCommentDTO) {
		let commentPivot: any = comment;
		commentPivot['createdAt'] = getCurrentBrDateTimeISO();
		commentPivot['updatedAt'] = getCurrentBrDateTimeISO();
		return await this.prismaService.partnerComment.create({
			data: commentPivot
		})
	}

	async listCommentsByPartner(id: string) {
		return await this.prismaService.partnerComment.findMany({
			where: {
				partnerId: id
			},
			select: {
				id: true,
				partnerId: true,
				userId: true,
				comment: true,
				createdAt: true,
				updatedAt: true,
				User: {
					select: {
						name: true,
						lastName: true,
						email: true
					}
				}
			},
			orderBy: {
				// createdAt: 'asc',
				updatedAt: 'desc'
			},
		})
	}

	update(id: string, comment: UpdateCommentDTO) {
		let commentPivot: any = comment;
		commentPivot['updatedAt'] = getCurrentBrDateTimeISO();
		return this.prismaService.partnerComment.update({
			data: comment,
			where: {
				id,
			},
		});
	}
}
