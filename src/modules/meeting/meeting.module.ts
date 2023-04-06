import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MettingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
	imports: [PrismaModule],
	controllers: [MettingController],
	providers: [MeetingService],
})
export class MeetingModule { }
