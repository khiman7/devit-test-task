import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { JwtPayload } from 'jsonwebtoken';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzExNzE0NDI5fQ.NTL9qw6RQBE5vVNoJVNl1flDe6RT2Nlcylu7Yg4wUnc

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto);
  }

  @Get('verify')
  async verifyAccessToken(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<{ payload: JwtPayload }> {
    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }

    const accessToken = authorizationHeader.split(' ')[1];
    const payload = await this.authService.verifyAccessToken(accessToken);

    if (!payload) {
      throw new UnauthorizedException('Invalid Access Token');
    }

    return { payload };
  }
}
