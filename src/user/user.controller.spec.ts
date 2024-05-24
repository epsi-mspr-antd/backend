import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto'
import { Roles } from './types';

describe('UserController', () => {
  let controller: UserController;

  const user = {
    id: 1,
    email: 'test.test@test.com',
    roles: [Roles.Botanist, Roles.Owner]
  }

  const usersRO = {
    id: 1,
    name: 'Test Plant',
    species: { id: 1, name: 'test' },
    status: { id: 1, name: 'test' },
  };

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue({ data: [user] });

      expect(controller.findAll()).resolves.toEqual({ data: [user] });
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockResolvedValue({ data: user });

      expect(controller.findOne(1)).resolves.toEqual({ data: user });
    });
  });

  describe('update', () => {
    it('should update and return an user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'test.test@test.com',
      };

      jest.spyOn(controller, 'update').mockResolvedValue({ data: user });

      expect(controller.update(1, 1, updateUserDto)).resolves.toEqual({
        data: user,
      });
    });
  });

});
