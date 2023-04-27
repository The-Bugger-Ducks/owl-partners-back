import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { getCurrentBrDateTimeISO } from "src/utils/getCurrentBrDateTimeISO";

@Injectable()
export class DashboardService {
	constructor(private readonly prismaService: PrismaService) { }

	async dashboard() {
		const totalActivePartners = this.prismaService.partner.count({
			where: { disabled: false }
		});

		const partnersPerStatus = this.prismaService.partner.groupBy({
			by: ['status'],
			where: { disabled: false }
		});

		const partnersPerState = this.prismaService.partner.groupBy({
			by: ['state'],
			where: { disabled: false }
		});

		const partnerPerClassification = this.prismaService.partner.groupBy({
			by: ['classification'],
			where: { disabled: false }
		});

		const top10MostMembers = this.prismaService.partner.findMany({
			where: { disabled: false },
			orderBy: { memberNumber: 'desc', },
			take: 10
		});

		const nextMeeting = this.prismaService.meeting.findFirst({
			where: {
				meetingDateTime: { gt: getCurrentBrDateTimeISO() },
				Partner: { disabled: false }
			},
			orderBy: { meetingDateTime: 'asc' }
		});

		return {
			totalActivePartners,
			top10MostMembers,

			partnersPerStatus,
			partnersPerState,
			partnerPerClassification,

			nextMeeting
		}
	}
}
