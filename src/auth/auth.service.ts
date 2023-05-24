import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signInDto: SignInDto) {
    const user = await this.usersService.create(signInDto);
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
