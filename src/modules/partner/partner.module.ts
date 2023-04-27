import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PrismaModule } from '../../database';

@Module({
	imports: [PrismaModule],
	controllers: [PartnerController],
	providers: [PartnerService],
})
export class PartnerModule { }
