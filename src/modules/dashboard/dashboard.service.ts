import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { getCurrentBrDateTimeISO } from "src/utils/getCurrentBrDateTimeISO";

@Injectable()
export class DashboardService {
	constructor(private readonly prismaService: PrismaService) { }

	async dashboard() {
		const totalActivePartners = await this.prismaService.partner.count({
			where: { disabled: false }
		});

		const top10MostMembers = await this.prismaService.partner.findMany({
			where: { disabled: false },
			orderBy: { memberNumber: 'desc', },
			take: 10
		});

		const partnersPerStatus = await this.prismaService.partner.groupBy({
			by: ['status'],
			where: { disabled: false },
			_count: true,
			orderBy: {
				status: 'asc'
			}
		});

		const partnersPerState = await this.prismaService.partner.groupBy({
			by: ['state'],
			where: { disabled: false },
			_count: true,
			orderBy: {
				_count: {
					state: 'desc'
				}
			}
		});

		const partnerPerClassification = await this.prismaService.partner.groupBy({
			by: ['classification'],
			where: { disabled: false },
			_count: true
		});


		const nextMeeting = await this.prismaService.meeting.findFirst({
			where: {
				meetingDateTime: { gt: getCurrentBrDateTimeISO() },
				Partner: { disabled: false }
			},
			include: {
				Partner: true
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
