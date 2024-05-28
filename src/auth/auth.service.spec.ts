import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionService } from 'src/session/session.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, SessionService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('allow you to register', () => {
      jest.spyOn(service, 'signup').mockResolvedValue({ data: tokensRO });
      expect(service.signup(authCreate)).resolves.toEqual({ data: tokensRO });
    });
  });

  describe('signin', () => {
    it('allow you to connect', () => {
      jest.spyOn(service, 'signin').mockResolvedValue({ data: tokensRO });
      expect(service.signin(auth)).resolves.toEqual({
        data: tokensRO,
      });
    });
  });

  describe('logout', () => {
    it('allowing you to disconnect', () => {
      jest.spyOn(service, 'logout').mockResolvedValue(undefined);
      expect(service.logout(1)).resolves.toBeUndefined();
    });
  });

  describe('refreshTokens', () => {
    it('Updating the token', () => {
      const accesToken = {
        access_token: 'test_accesToken',
      };

      jest
        .spyOn(service, 'refreshTokens')
        .mockResolvedValue({ data: accesToken });
      expect(service.refreshTokens(1, 'test_refreshTokens')).resolves.toEqual({
        data: accesToken,
      });
    });
  });
});
