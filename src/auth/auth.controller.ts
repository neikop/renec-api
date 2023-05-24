import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
