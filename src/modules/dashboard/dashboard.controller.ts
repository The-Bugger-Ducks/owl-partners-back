import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";

@Controller('/dashboard')
@ApiTags('dashboard')
export class DashboardController {

	constructor(private dashboardService: DashboardService) { }

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async index() {
		return await this.dashboardService.dashboard();
	}
}
