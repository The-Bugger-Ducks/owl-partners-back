import { Module } from '@nestjs/common';

import { PartnerModule } from './modules/partner/partner.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, PartnerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
