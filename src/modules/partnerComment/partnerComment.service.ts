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

  update(id: string, comment: UpdateCommentDTO) {
    return this.prismaService.partnerComment.update({
      data: comment,
      where: {
        id,
      },
    });
  }
}