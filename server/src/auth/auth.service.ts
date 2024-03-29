import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/user.service';
import { SignInDTO } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    username,
    password,
  }: SignInDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyAccessToken(token: string): Promise<object | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
