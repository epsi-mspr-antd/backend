import { Test, TestingModule } from '@nestjs/testing';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/address/address.service';

describe('PlantController', () => {
  let controller: PlantController;
  let service: PlantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      providers: [PlantService, PrismaService, AddressService],
    }).compile();

    controller = module.get<PlantController>(PlantController);
    service = module.get<PlantService>(PlantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find user plants', async () => {
    const result = {
      data: [
        {
          id: 1,
          name: 'Plant 1',
          species: {
            id: 1,
            name: 'Species 1',
          },
          status: {
            id: 1,
            name: 'Status 1',
          },
        },
        {
          id: 2,
          name: 'Plant 2',
          species: {
            id: 1,
            name: 'Species 1',
          },
          status: {
            id: 1,
            name: 'Status 1',
          },
        },
      ],
    };

    jest
      .spyOn(service, 'findUserPlants')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.findUserPlants(1)).toBe(result);
  });
});
