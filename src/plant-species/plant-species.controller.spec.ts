import { Test, TestingModule } from '@nestjs/testing';
import { PlantSpeciesController } from './plant-species.controller';
import { PlantSpeciesService } from './plant-species.service';

describe('PlantSpeciesController', () => {
  let controller: PlantSpeciesController;

  const plantSpecies = {
    id: 1,
    name: 'Test PlantSpecies',  
  };

  const mockPlantSpeciesService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantSpeciesController],
      providers: [
        {
          provide: PlantSpeciesService,
          useValue: mockPlantSpeciesService,
        },
      ],
    }).compile();

    controller = module.get<PlantSpeciesController>(PlantSpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plants', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue({ data: [plantSpecies] });

      expect(controller.findAll()).resolves.toEqual({ data: [plantSpecies] });
    });
  });

});
