import { Test, TestingModule } from '@nestjs/testing';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';
import { CreateTipDto, UpdateTipDto } from './dto';

describe('TipController', () => {
  let controller: TipController;

  const tip = {
    id: 1,
    description: "C'est un super tip pour votre plante",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const tipRO = {
    data: tip,
  };

  const tipsRO = {
    data: [tip],
  };

  const mockTipService = {
    findPlantTips: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipController],
      providers: [
        {
          provide: TipService,
          useValue: mockTipService,
        },
      ],
    }).compile();

    controller = module.get<TipController>(TipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a tip', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue({ data: tip });

      expect(controller.findOne(1)).resolves.toEqual({ data: tip });
    });
  });

  describe('findPlantTips', () => {
    it("should return an array of  plant's tips", async () => {
      jest.spyOn(controller, 'findPlantTips').mockResolvedValue(tipsRO);

      expect(controller.findPlantTips(1)).resolves.toEqual({ data: [tip] });
    });
  });

  describe('create', () => {
    it('should create and return a tip', async () => {
      const createTipDto: CreateTipDto = {
        description: 'Un nouveau tip pour votre plante',
        plantId: 1,
      };

      jest.spyOn(controller, 'create').mockResolvedValue(tipRO);

      expect(controller.create(1, createTipDto, null)).resolves.toEqual({
        data: tip,
      });
    });
  });

  describe('update', () => {
    it('should update and return a tip', async () => {
      const updateTipDto: UpdateTipDto = {
        description: 'Nouvelle description',
      };

      jest.spyOn(controller, 'update').mockResolvedValue(tipRO);

      expect(controller.update(1, 1, updateTipDto, null)).resolves.toEqual({
        data: tip,
      });
    });
  });

  describe('delete', () => {
    it('should delete a tip', async () => {
      jest.spyOn(controller, 'delete').mockResolvedValue();

      expect(controller.delete(1, 1)).resolves.toBeUndefined();
    });
  });
});
