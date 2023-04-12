import { Module } from '@nestjs/common';

import { PartnerModule } from './modules/partner/partner.module';
import { UserModule } from './modules/user/user.module';
import { PartnerCommentModule } from './modules/partnerComment/partnerComment.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeetingModule } from './modules/meeting/meeting.module';

@Module({
	imports: [UserModule, PartnerModule, PartnerCommentModule, MeetingModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule { }
