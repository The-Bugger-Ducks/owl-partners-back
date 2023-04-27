import { Module } from '@nestjs/common';
import { MettingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { PrismaModule } from '../../database';

@Module({
	imports: [PrismaModule],
	controllers: [MettingController],
	providers: [MeetingService],
})
export class MeetingModule { }
