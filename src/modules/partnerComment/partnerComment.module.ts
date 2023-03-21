import { Module } from "@nestjs/common";

import { PrismaModule } from "src/database/prisma/prisma.module";
import { PartnerCommentController } from "./partnerComment.controller";
import { PartnerCommentService } from "./partnerComment.service";

@Module({
  imports: [PrismaModule],
  controllers: [PartnerCommentController],
  providers: [PartnerCommentService],
})
export class PartnerCommentModule { }