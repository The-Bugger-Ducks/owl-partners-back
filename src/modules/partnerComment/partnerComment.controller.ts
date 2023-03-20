import { Body, Controller, Param, Post, Put } from "@nestjs/common";
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

  @Put('comment/:id')
  async update(@Param('id') id: string, @Body() commentData: UpdateCommentDTO) {
    return await this.partnerCommentService.update(id, commentData);
  }
}