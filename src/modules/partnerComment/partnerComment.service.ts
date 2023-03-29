import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { UpdateCommentDTO } from "./dto/updateComment.dto";

@Injectable()
export class PartnerCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async addComment(comment: CreateCommentDTO) {
		comment.userId = '06c8112a-47f7-4cf5-8f7a-484aeca53076'

		return await this.prismaService.partnerComment.create({
			data: comment
		})
	}

	async listCommentsByPartner(id: string) {
		return await this.prismaService.partnerComment.findMany({
			where: {
				partnerId: id
			},
			include: { User: true },

			orderBy: {
				// createdAt: 'asc',
				updatedAt: 'asc'
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
