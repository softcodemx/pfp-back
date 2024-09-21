import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// DTO's
import { SessionDto } from './dto/session.dto';
import { UpdateUserDto } from 'src/core/users/dto/update-user.dto';

// Services
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<SessionDto> {
    const user: UpdateUserDto = await this.usersService.findOne({email: username});

    const { password, ...result } = user;

    if (password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id_user, username: user.email };

    const session: SessionDto = {
      accessToken: await this.jwtService.signAsync(payload),
      user: result,
    };
    return session;
  }
}
