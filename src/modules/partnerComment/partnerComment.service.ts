import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database";
import { CreateCommentDTO } from "./dto/createComment.dto";

@Injectable()
export class PartnerCommentService {
  constructor(private readonly prismaService: PrismaService) { }

  async addComment(comment: CreateCommentDTO) {
    return await this.prismaService.partnerComment.create({
      data: comment
    })
  }
}