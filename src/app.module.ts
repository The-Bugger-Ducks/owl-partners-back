import { Module } from '@nestjs/common';

import { PartnerModule } from './modules/partner/partner.module';
import { UserModule } from './modules/user/user.module';
import { PartnerCommentModule } from './modules/partnerComment/partnerComment.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { MeetingCommentModule } from './modules/meetingComment/meetingComment.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		PartnerModule,
		PartnerCommentModule,
		MeetingModule,
		MeetingCommentModule,
		DashboardModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
