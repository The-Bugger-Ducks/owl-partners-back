import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { PartnerCommentService } from "./partnerComment.service";
import { UpdateCommentDTO } from "./dto/updateComment.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { HasRoles } from "../auth/decorators/has-roles.decorator";
import { RoleEnum } from "../user/enums/role.enum";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller('partners')
@ApiTags('partnerComments')
export class PartnerCommentController {
	constructor(private readonly partnerCommentService: PartnerCommentService) { }

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Post('comment')
	async addComment(@Body() commentData: CreateCommentDTO) {
		return await this.partnerCommentService.addComment(commentData);
	}

	@Get('comment/:partnerId')
	@UseGuards(AuthGuard('jwt'))
	async list(@Param('partnerId') partnerId: string) {
		return await this.partnerCommentService.listCommentsByPartner(partnerId);
	}

	@HasRoles(RoleEnum.ADMIN)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Put('comment/:commentId')
	async update(@Param('commentId') commentId: string, @Body() commentData: UpdateCommentDTO) {
		return await this.partnerCommentService.update(commentId, commentData);
	}
}
