import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

// DTO's
import { CredentialDto } from './dto/credential.dto';

// Guards
import { Public } from './guards/public.guard';

// Services
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: CredentialDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
