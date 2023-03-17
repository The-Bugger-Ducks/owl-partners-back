import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

@Module({
  imports: [PrismaModule],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}
