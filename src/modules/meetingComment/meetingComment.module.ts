import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MettingCommentController } from './meetingComment.controller';
import { MeetingCommentService } from './meetingComment.service';

@Module({
	imports: [PrismaModule],
	controllers: [MettingCommentController],
	providers: [MeetingCommentService],
})
export class MeetingCommentModule {}
