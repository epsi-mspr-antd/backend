import { Test, TestingModule } from '@nestjs/testing';
import { PlantStatusService } from './plant-status.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PlantStatusService', () => {
  let service: PlantStatusService;

  const plantSpecies = {
    id: 1,
    name: 'Je suis une espèce de plante',
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantStatusService, PrismaService],
    }).compile();

    service = module.get<PlantStatusService>(PlantStatusService);
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
