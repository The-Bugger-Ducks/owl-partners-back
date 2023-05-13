import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";

import { EmailIsUniqueValidator } from "./validation/email-is-unique.validator";
import { UserService } from "./user.service";
import { PrismaModule } from "src/database/prisma/prisma.module";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [PrismaModule, forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService, EmailIsUniqueValidator],
	exports: [UserService],
})
export class UserModule {

}
