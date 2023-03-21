import { Module } from '@nestjs/common';

import { PartnerModule } from './modules/partner/partner.module';
import { UserModule } from './modules/user/user.module';
import { PartnerCommentModule } from './modules/partnerComment/partnerComment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, PartnerModule, PartnerCommentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
