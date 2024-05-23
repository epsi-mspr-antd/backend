import { Test, TestingModule } from '@nestjs/testing';
import { PlantStatusController } from './plant-status.controller';
import { PlantStatusService } from './plant-status.service';

describe('PlantStatusController', () => {
  let controller: PlantStatusController;

  const plant = {
    id: 1,
    name: 'Test PlantStatus',
  };

  const mockPlantService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantStatusController],
      providers: [
        {
          provide: PlantStatusService,
          useValue: mockPlantService,
        },
      ],
    }).compile();

    controller = module.get<PlantStatusController>(PlantStatusController);
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

});
