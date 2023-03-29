import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { UpdateCommentDTO } from "./dto/updateComment.dto";

@Injectable()
export class PartnerCommentService {
	constructor(private readonly prismaService: PrismaService) { }

	async addComment(comment: CreateCommentDTO) {
		comment.userId = '06c8112a-47f7-4cf5-8f7a-484aeca53076'
		// comment.userId = 'e9373102-350c-4a58-9515-d98221c1548b'

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
