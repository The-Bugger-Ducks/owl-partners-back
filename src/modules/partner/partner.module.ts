import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { MeetingService } from '../meeting/meeting.service';
import { PrismaModule } from '../../database';

@Module({
	imports: [PrismaModule],
	controllers: [PartnerController],
	providers: [PartnerService, MeetingService],
})
export class PartnerModule { }
