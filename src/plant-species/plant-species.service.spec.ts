import { Test, TestingModule } from '@nestjs/testing';
import { PlantSpeciesService } from './plant-species.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PlantSpeciesService', () => {
  let service: PlantSpeciesService;

  const plantSpecies = {
    id: 1,
    name: 'Je suis une espèce de plante',
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantSpeciesService, PrismaService],
    }).compile();

    service = module.get<PlantSpeciesService>(PlantSpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('get all plants', () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue({ data: [plantSpecies, plantSpecies] });
      expect(service.findAll()).resolves.toEqual({ data: [plantSpecies, plantSpecies] });
    });
  });

});
