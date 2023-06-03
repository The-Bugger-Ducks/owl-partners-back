import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		ConfigModule.forRoot(),
		forwardRef(() => UserModule),
		PassportModule,
		JwtModule.register({
			privateKey: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: '1d' }
		})
	],
	controllers: [AuthController],
	providers: [LocalStrategy, AuthService, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule { }
