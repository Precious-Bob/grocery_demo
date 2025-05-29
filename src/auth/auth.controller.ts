import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto, signupDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: signupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: signinDto) {
    return this.authService.signin(dto);
  }
}
