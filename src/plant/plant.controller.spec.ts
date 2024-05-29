import { Test, TestingModule } from '@nestjs/testing';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { CreatePlantDto, UpdatePlantDto } from './dto';

describe('PlantController', () => {
  let controller: PlantController;

  const plant = {
    id: 1,
    name: 'Test Plant',
    species: { id: 1, name: 'test' },
    status: { id: 1, name: 'test' },
  };

  const mockPlantService = {
    findAll: jest.fn(),
    findUserPlants: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      providers: [
        {
          provide: PlantService,
          useValue: mockPlantService,
        },
      ],
    }).compile();

    controller = module.get<PlantController>(PlantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plants', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue({ data: [plant] });

      expect(controller.findAll()).resolves.toEqual({ data: [plant] });
    });
  });

  describe('findUserPlants', () => {
    it('should return an array of user plants', async () => {
      jest
        .spyOn(controller, 'findUserPlants')
        .mockResolvedValue({ data: [plant] });

      expect(controller.findUserPlants(1)).resolves.toEqual({ data: [plant] });
    });
  });

  describe('create', () => {
    it('should create and return a plant', async () => {
      const createPlantDto: CreatePlantDto = {
        name: 'Test Plant',
        speciesId: 1,
        statusId: 1,
        addressId: 1,
      };

      jest.spyOn(controller, 'create').mockResolvedValue({ data: plant });

      expect(controller.create(1, createPlantDto)).resolves.toEqual({
        data: plant,
      });
    });
  });

  describe('fetchAllGuard', () => {
    it('should list guarded plant', async () => {
      jest
        .spyOn(controller, 'fetchAllGuard')
        .mockResolvedValue({ data: [plant] });

      expect(controller.fetchAllGuard(1)).resolves.toEqual({ data: [plant] });
    });
  });

  describe('guard', () => {
    it('should guard a plant', async () => {
      jest.spyOn(controller, 'guard').mockResolvedValue({ data: plant });

      expect(controller.guard(1, 1)).resolves.toEqual({ data: plant });
    });
  });

  describe('unguard', () => {
    it('should unguard a plant', async () => {
      jest.spyOn(controller, 'unguard').mockResolvedValue({ data: plant });

      expect(controller.unguard(1, 1)).resolves.toEqual({ data: plant });
    });
  });

  describe('update', () => {
    it('should update and return a plant', async () => {
      const updatePlantDto: UpdatePlantDto = {
        name: 'Updated Plant',
        speciesId: 1,
        statusId: 1,
      };

      jest.spyOn(controller, 'update').mockResolvedValue({ data: plant });

      expect(controller.update(1, 1, updatePlantDto)).resolves.toEqual({
        data: plant,
      });
    });
  });

  describe('delete', () => {
    it('should delete a plant', async () => {
      jest.spyOn(controller, 'delete').mockResolvedValue(undefined);

      expect(controller.delete(1, 1)).resolves.toBeUndefined();
    });
  });
});
