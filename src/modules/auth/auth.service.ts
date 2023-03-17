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
    try {
      user = await this.userService.findUserByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
