import { Test, TestingModule } from '@nestjs/testing';
import { MeTipService } from './me-tip.service';
import { MeTipController } from './me-tip.controller';

describe('MeAddressController', () => {
  let controller: MeTipController;

  const meTip = {
    id: 1,
    description: 'C\'est un super tip pour votre plante',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const meTipRO = {
    data: [meTip]
  };
 
  const mockMeTipService = {
    findAll: jest.fn(),  
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeTipController],
      providers: [
        {
          provide: MeTipService,
          useValue: mockMeTipService
        },
      ],
    }).compile();

    controller = module.get<MeTipController>(MeTipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of my tips', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue(meTipRO);

      expect(controller.findAll(1)).resolves.toEqual(meTipRO);
    });
  });

});
