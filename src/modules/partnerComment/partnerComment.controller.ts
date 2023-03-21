import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { PartnerCommentService } from "./partnerComment.service";
import { UpdateCommentDTO } from "./dto/updateComment.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('partners')
@ApiTags('partnerComments')
export class PartnerCommentController {
  constructor(private readonly partnerCommentService: PartnerCommentService) { }

  @Post('comment')
  async addComment(@Body() commentData: CreateCommentDTO) {
    return await this.partnerCommentService.addComment(commentData);
  }

  @Get('comment/:partnerId')
  async list(@Param('partnerId') partnerId: string) {
    return await this.partnerCommentService.listCommentsByPartner(partnerId);
  }

  @Put('comment/:commentId')
  async update(@Param('commentId') commentId: string, @Body() commentData: UpdateCommentDTO) {
    return await this.partnerCommentService.update(commentId, commentData);
  }
}