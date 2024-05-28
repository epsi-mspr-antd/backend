import { Test, TestingModule } from '@nestjs/testing';
import { MeAddressService } from './me-address.service';
import { MeAddressController } from './me-address.controller';

describe('MeAddressController', () => {
  let controller: MeAddressController;

  const meAddress = {
    id: 1,
    name: 'test',
    street: 'La rue du test',
    zip: '69230',
    city: 'LYON',
    longitude: 4.8357,
    latitude: 45.764,
  };

  const meAddressesRO = {
    data: [meAddress],
  };

  const mockMeAddressService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeAddressController],
      providers: [
        {
          provide: MeAddressService,
          useValue: mockMeAddressService,
        },
      ],
    }).compile();

    controller = module.get<MeAddressController>(MeAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of my adresses', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue(meAddressesRO);

      expect(controller.findAll(1)).resolves.toEqual(meAddressesRO);
    });
  });
});
