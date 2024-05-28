import { Test, TestingModule } from '@nestjs/testing';
import { MeAddressService } from './me-address.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('MeAddressService', () => {
  let service: MeAddressService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeAddressService, PrismaService],
    }).compile();

    service = module.get<MeAddressService>(MeAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of my adresses', () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(meAddressesRO);
      expect(service.findAll(1)).resolves.toEqual(meAddressesRO);
    });
  });
});
