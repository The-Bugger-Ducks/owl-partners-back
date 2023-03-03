import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

import { EmailIsUniqueValidator } from "./validation/email-is-unique.validator";
import { UserRepository } from "./user.repository";
import { PrismaModule } from "src/infra/database/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepository, EmailIsUniqueValidator]
})
export class UserModule {

}