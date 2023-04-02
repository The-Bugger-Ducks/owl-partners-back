import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { UpdateCommentDTO } from "./dto/updateComment.dto";

@Injectable()
export class PartnerCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async addComment(comment: CreateCommentDTO) {
		return await this.prismaService.partnerComment.create({
			data: comment
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
		return this.prismaService.partnerComment.update({
			data: comment,
			where: {
				id,
			},
		});
	}
}
