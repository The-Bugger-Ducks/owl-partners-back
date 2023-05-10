import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { MeetingService } from '../meeting/meeting.service';

@Module({
	imports: [PrismaModule],
	controllers: [PartnerController],
	providers: [PartnerService, MeetingService],
})
export class PartnerModule {}
