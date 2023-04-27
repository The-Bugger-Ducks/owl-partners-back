import { Module } from "@nestjs/common";

import { PrismaModule } from '../../database';
import { PartnerCommentController } from "./partnerComment.controller";
import { PartnerCommentService } from "./partnerComment.service";

@Module({
	imports: [PrismaModule],
	controllers: [PartnerCommentController],
	providers: [PartnerCommentService],
})
export class PartnerCommentModule { }
