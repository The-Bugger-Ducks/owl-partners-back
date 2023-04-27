import { Module } from '@nestjs/common';
import { MettingCommentController } from './meetingComment.controller';
import { MeetingCommentService } from './meetingComment.service';
import { PrismaModule } from '../../database';

@Module({
	imports: [PrismaModule],
	controllers: [MettingCommentController],
	providers: [MeetingCommentService],
})
export class MeetingCommentModule { }
