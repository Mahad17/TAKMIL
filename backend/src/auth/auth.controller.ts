import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
//   @UseGuards(JwtAuthGuard)
  register(@Body() body: any) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }
}
