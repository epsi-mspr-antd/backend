import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/address/address.service';
import { PlantGuardedService } from './plant-guarded.service';
import { PlantService } from 'src/plant/plant.service';

describe('PlantService', () => {
  let service: PlantGuardedService;

  const plantGuarded = {
    id: 1,
    from: new Date(),
    to: new Date(),
    plant: { id: 1, name: 'Test Plant' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantGuardedService,
        PlantService,
        PrismaService,
        AddressService,
      ],
    }).compile();

    service = module.get<PlantGuardedService>(PlantGuardedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('get all plants', () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue({ data: [plantGuarded, plantGuarded] });
      expect(service.findAll()).resolves.toEqual({
        data: [plantGuarded, plantGuarded],
      });
    });
  });

  describe('guard', () => {
    it('get all user plants', () => {
      jest.spyOn(service, 'guard').mockResolvedValue({ data: plantGuarded });
      expect(service.guard(1, 1)).resolves.toEqual({
        data: plantGuarded,
      });
    });
  });

  describe('create', () => {
    it('create plant', () => {
      jest.spyOn(service, 'create').mockResolvedValue({ data: plantGuarded });
      expect(
        service.create(1, {
          from: new Date(),
          to: new Date(),
          plantId: 1,
        }),
      ).resolves.toEqual({ data: plantGuarded });
    });
  });

  describe('update', () => {
    it('update plant', () => {
      jest.spyOn(service, 'update').mockResolvedValue({ data: plantGuarded });
      expect(service.update(1, 1, {})).resolves.toEqual({ data: plantGuarded });
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
      jest.spyOn(service, 'isPlantGuardable').mockResolvedValue();
      expect(service.isPlantGuardable(1)).resolves.toBeUndefined();
    });
  });
});
