import { Test, TestingModule } from '@nestjs/testing';
import { MeTipService } from './me-tip.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('MeTipService', () => {
  let service: MeTipService;

  const meTip = {
    id: 1,
    description: 'C\'est un super tip pour votre plante',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const meTipRO = {
    data: [meTip]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeTipService, PrismaService],
    }).compile();

    service = module.get<MeTipService>(MeTipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of my adresses', () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(meTipRO);
      expect(
        service.findAll(1),
      ).resolves.toEqual(meTipRO);
    });
  });

});
