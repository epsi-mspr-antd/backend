import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from './types';


describe('UserService', () => {
  let service: UserService;

  const user = {
    id: 1,
    email: 'test.test@test.com',
    roles: [Roles.Botanist, Roles.Owner]
  }

   const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    isUserOwner: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('get all users', () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue({ data: [user] });
      expect(service.findAll()).resolves.toEqual({ data: [user] });
    });
  });

  describe('findOne', () => {
    it('get an user', () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ data: user });
      expect(service.findOne(1)).resolves.toEqual({
        data:  user ,
      });
    });
  });

  describe('update', () => {
    it('update user', () => {
      jest.spyOn(service, 'update').mockResolvedValue({ data: user });
      expect(service.update(1, 1, {})).resolves.toEqual({ data: user });
    });
  });

  describe('delete', () => {
    it('delete user', () => {
      jest.spyOn(service, 'delete').mockResolvedValue();
      expect(service.delete(1, 1)).resolves.toBeUndefined();
    });
  });

  describe('isUserOwner', () => {
    it('is user owner', () => {
      jest.spyOn(service, 'isUserOwner').mockResolvedValue();
      expect(service.isUserOwner(1, 1)).resolves.toBeUndefined();
    });
  });

});
