import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const validRoles: string[] = [];
    for (const role of user.roles) {
      validRoles.push(role.role);
    }
    const payload = { email: user.email, roles: validRoles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
