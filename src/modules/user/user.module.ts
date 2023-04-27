import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

import { EmailIsUniqueValidator } from "./validation/email-is-unique.validator";
import { UserService } from "./user.service";
import { PrismaModule } from "../../database";

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService, EmailIsUniqueValidator],
	exports: [UserService],
})
export class UserModule {

}
