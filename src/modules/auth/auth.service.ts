import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async login(user) {
		user.password = undefined;
		const payload = { sub: user.id, email: user.email, role: user.role };


		return {
			user,
			token: this.jwtService.sign(payload),
		};
	}

	async validateUser(email: string, password: string) {
		let user;
		user = await this.userService.findUserByEmail(email);
		if (!user) return null;

		const isPasswordValid = compareSync(password, user.password);
		if (!isPasswordValid) return null;

		return user;
	}
}
