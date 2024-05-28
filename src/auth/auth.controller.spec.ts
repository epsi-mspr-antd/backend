import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const authCreate = {
    pseudo: 'Test_Auth',
    email: 'test.auth@tes.com',
    password: 'Test_Pwd_Auth',
  };

  const auth = {
    email: 'test.auth@tes.com',
    password: 'Test_Pwd_Auth',
  };

  const tokensRO = {
    id: 1,
    access_token: 'test_access_token',
    refresh_token: 'test_refesh_token',
  };

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
    logout: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return an accessToken & refreshToken', async () => {
      jest.spyOn(controller, 'signup').mockResolvedValue({ data: tokensRO });

      expect(controller.signup(authCreate)).resolves.toEqual({
        data: tokensRO,
      });
    });
  });

  describe('signin', () => {
    it('should return an accessToken & refreshToken', async () => {
      jest.spyOn(controller, 'signin').mockResolvedValue({ data: tokensRO });

      expect(controller.signin(auth)).resolves.toEqual({ data: tokensRO });
    });
  });

  describe('logout', () => {
    it('should logout', async () => {
      jest.spyOn(controller, 'logout').mockResolvedValue(undefined);

      expect(controller.logout(1)).resolves.toBeUndefined();
    });
  });

  describe('refreshTokens', () => {
    it('should return a refreshToken', async () => {
      const accesToken = {
        access_token: 'test_accesToken',
      };

      jest
        .spyOn(controller, 'refreshTokens')
        .mockResolvedValue({ data: accesToken });

      expect(controller.refreshTokens(1, 'refreshTest')).resolves.toEqual({
        data: accesToken,
      });
    });
  });
});
