import { Test, TestingModule } from '@nestjs/testing';
import { TipService } from './tip.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlantService } from 'src/plant/plant.service';
import { AddressService } from 'src/address/address.service';
import { UpdateTipDto } from './dto';
import { PicService } from 'src/pic/pic.service';

describe('TipService', () => {
  let service: TipService;

  const tip = {
    id: 1,
    description: "C'est un super tip pour votre plante",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updateTipDto: UpdateTipDto = {
    description: 'Nouvelle description',
  };

  const tipRO = {
    data: tip,
  };

  const tipsRO = {
    data: [tip],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipService,
        PrismaService,
        PlantService,
        AddressService,
        PicService,
      ],
    }).compile();

    service = module.get<TipService>(TipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPlantTips', () => {
    it("get all plant's tips", () => {
      jest.spyOn(service, 'findPlantTips').mockResolvedValue(tipsRO);
      expect(service.findPlantTips(1)).resolves.toEqual({ data: [tip] });
    });
  });

  describe('findOne', () => {
    it('should return a tip', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({ data: tip });

      expect(service.findOne(1)).resolves.toEqual({ data: tip });
    });
  });

  describe('create', () => {
    it('create tip', () => {
      jest.spyOn(service, 'create').mockResolvedValue(tipRO);
      expect(
        service.create(
          1,
          {
            description: 'Un nouveau tip pour votre plante',
            plantId: 1,
          },
          null,
        ),
      ).resolves.toEqual(tipRO);
    });
  });

  describe('update', () => {
    it('update tip', () => {
      jest.spyOn(service, 'update').mockResolvedValue(tipRO);
      expect(service.update(1, 1, updateTipDto, null)).resolves.toEqual(tipRO);
    });
  });

  describe('delete', () => {
    it('delete tip', () => {
      jest.spyOn(service, 'delete').mockResolvedValue();
      expect(service.delete(1, 1)).resolves.toBeUndefined();
    });
  });
});
