import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/user.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
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
}
