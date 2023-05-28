import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

const authService = {
  signIn: jest.fn(),
  signUp: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UsersService, useValue: {} },
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('AuthService', () => {
    it('should call `signIn` once', async () => {
      const user: SignInDto = {
        username: 'john',
        password: 'hash',
      };
      await controller.login(user);
      expect(service.signIn).toHaveBeenCalledTimes(1);
    });

    it('should call `signUp` once', async () => {
      const user: SignInDto = {
        username: 'john',
        password: 'hash',
      };
      await controller.register(user);
      expect(service.signUp).toHaveBeenCalledTimes(1);
    });

    it('should return `user`', async () => {
      const req = {
        user: {},
      };
      const user = await controller.getProfile(req);
      expect(user).toBe(req.user);
    });
  });
});
