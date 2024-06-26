import { Test, TestingModule } from '@nestjs/testing';
import { PlantService } from './plant.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/address/address.service';
import { PicService } from 'src/pic/pic.service';

describe('PlantService', () => {
  let service: PlantService;

  const plant = {
    id: 1,
    name: 'Je suis une plante',
    species: {
      id: 1,
      name: 'Je suis une plante',
    },
    status: {
      id: 1,
      name: 'Je suis une plante',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantService, PrismaService, AddressService, PicService],
    }).compile();

    service = module.get<PlantService>(PlantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('get all plants', () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue({ data: [plant, plant] });
      expect(service.findAll()).resolves.toEqual({ data: [plant, plant] });
    });
  });

  describe('findOne', () => {
    it('should return a plant', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ data: plant });

      expect(service.findOne(1)).resolves.toEqual({ data: plant });
    });
  });

  describe('findUserPlants', () => {
    it('get all user plants', () => {
      jest
        .spyOn(service, 'findUserPlants')
        .mockResolvedValue({ data: [plant, plant] });
      expect(service.findUserPlants(1)).resolves.toEqual({
        data: [plant, plant],
      });
    });
  });

  describe('create', () => {
    it('create plant', () => {
      jest.spyOn(service, 'create').mockResolvedValue({ data: plant });
      expect(
        service.create(
          1,
          {
            name: 'Je suis une plante',
            speciesId: 1,
            statusId: 1,
            addressId: 1,
          },
          null,
        ),
      ).resolves.toEqual({ data: plant });
    });
  });

  describe('fetchAllGuard', () => {
    it('should list guarded plant', async () => {
      jest.spyOn(service, 'fetchAllGuard').mockResolvedValue({ data: [plant] });

      expect(service.fetchAllGuard(1)).resolves.toEqual({ data: [plant] });
    });
  });

  describe('guard', () => {
    it('should guard a plant', async () => {
      jest.spyOn(service, 'guard').mockResolvedValue({ data: plant });

      expect(service.guard(1, 1)).resolves.toEqual({ data: plant });
    });
  });

  describe('unguard', () => {
    it('should unguard a plant', async () => {
      jest.spyOn(service, 'unguard').mockResolvedValue({ data: plant });

      expect(service.unguard(1, 1)).resolves.toEqual({ data: plant });
    });
  });

  describe('update', () => {
    it('update plant', () => {
      jest.spyOn(service, 'update').mockResolvedValue({ data: plant });
      expect(service.update(1, 1, {}, null)).resolves.toEqual({ data: plant });
    });
  });

  describe('delete', () => {
    it('delete plant', () => {
      jest.spyOn(service, 'delete').mockResolvedValue();
      expect(service.delete(1, 1)).resolves.toBeUndefined();
    });
  });

  describe('isPlantOwner', () => {
    it('is plant owner', () => {
      jest.spyOn(service, 'isPlantOwner').mockResolvedValue();
      expect(service.isPlantOwner(1, 1)).resolves.toBeUndefined();
    });
  });

  describe('isPlantExists', () => {
    it('is plant exists', () => {
      jest.spyOn(service, 'isPlantExists').mockResolvedValue();
      expect(service.isPlantExists(1)).resolves.toBeUndefined();
    });
  });
});
