import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

const userServiceMock = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const jwtServiceMock = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should `signIn` successfully', async () => {
    const user: SignInDto = {
      username: 'john',
      password: 'hash',
    };
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(user as User);
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('');

    const data = await authService.signIn(user);
    expect(data.username).toBe(user.username);
  });

  it('should `signUp` successfully', async () => {
    const user: SignInDto = {
      username: 'john',
      password: 'hash',
    };
    jest.spyOn(userService, 'create').mockResolvedValueOnce(user as User);

    const data = await authService.signUp(user);
    expect(data.username).toBe(user.username);
  });
});
