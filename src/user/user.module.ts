import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailIsUniqueValidator } from "./validation/email-is-unique.validator";

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailIsUniqueValidator]
})
export class UserModule {

}