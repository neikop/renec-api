import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.username);
    const isMatch = await bcrypt.compare(
      signInDto.password,
      user?.password ?? '',
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { sub: user.id, username: user.username };
    return {
      id: user.id,
      username: user.username,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.create(signUpDto);
    const payload = { sub: user.id, username: user.username };
    return {
      id: user.id,
      username: user.username,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
