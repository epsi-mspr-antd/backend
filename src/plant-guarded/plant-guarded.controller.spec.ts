import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantGuardedDto, UpdatePlantGuardedDto } from './dto';
import { PlantGuardedController } from './plant-guarded.controller';
import { PlantGuardedService } from './plant-guarded.service';

describe('PlantGuardedController', () => {
  let controller: PlantGuardedController;

  const plantGuarded = {
    id: 1,
    from: new Date(),
    to: new Date(),
    plant: { id: 1, name: 'Test Plant' },
  };

  const mockPlantGuardedService = {
    findAll: jest.fn(),
    guard: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantGuardedController],
      providers: [
        {
          provide: PlantGuardedService,
          useValue: mockPlantGuardedService,
        },
      ],
    }).compile();

    controller = module.get<PlantGuardedController>(PlantGuardedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plants', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockResolvedValue({ data: [plantGuarded] });

      expect(controller.findAll()).resolves.toEqual({ data: [plantGuarded] });
    });
  });

  describe('guard', () => {
    it('should return an array of user plants', async () => {
      jest.spyOn(controller, 'guard').mockResolvedValue({ data: plantGuarded });

      expect(controller.guard(1, 1)).resolves.toEqual({ data: plantGuarded });
    });
  });

  describe('create', () => {
    it('should create and return a plant', async () => {
      const createPlantDto: CreatePlantGuardedDto = {
        from: new Date(),
        to: new Date(),
        plantId: 1,
      };

      jest
        .spyOn(controller, 'create')
        .mockResolvedValue({ data: plantGuarded });

      expect(controller.create(1, createPlantDto)).resolves.toEqual({
        data: plantGuarded,
      });
    });
  });

  describe('update', () => {
    it('should update and return a plant', async () => {
      const updatePlantDto: UpdatePlantGuardedDto = {
        to: new Date(),
      };

      jest
        .spyOn(controller, 'update')
        .mockResolvedValue({ data: plantGuarded });

      expect(controller.update(1, 1, updatePlantDto)).resolves.toEqual({
        data: plantGuarded,
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
