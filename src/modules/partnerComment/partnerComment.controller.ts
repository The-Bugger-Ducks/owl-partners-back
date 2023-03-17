import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateCommentDTO } from "./dto/createComment.dto";
import { PartnerCommentService } from "./partnerComment.service";

@Controller('partners')
export class PartnerCommentController {
  constructor(private readonly partnerCommentService: PartnerCommentService) { }

  @Post('comment')
  async addComment(@Body() commentData: CreateCommentDTO) {
    return await this.partnerCommentService.addComment(commentData);
  }
}