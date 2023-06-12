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
    const { password, roles, ...result } = user;
    const validRoles = roles.map((role) => {
      if (role.expiration <= new Date()) return role.role;
    });
    const payload = { ...result, roles: validRoles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
