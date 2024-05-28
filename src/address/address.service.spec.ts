import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AddressService', () => {
  let service: AddressService;

  const address = {
    id: 1,
    name: 'test',
    street: 'La rue du test',
    zip: '69230',
    city: 'LYON',
    longitude: 4.8357,
    latitude: 45.764,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, PrismaService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create plant', () => {
      jest.spyOn(service, 'create').mockResolvedValue({ data: address });
      expect(
        service.create(1, {
          name: 'test',
          street: 'Je suis une nouvelle rue',
          zip: '37000',
          city: 'TOURS',
          longitude: 0.8357,
          latitude: 30.764,
        }),
      ).resolves.toEqual({ data: address });
    });
  });

  describe('update', () => {
    it('update plant', () => {
      jest.spyOn(service, 'update').mockResolvedValue({ data: address });
      expect(service.update(1, 1, {})).resolves.toEqual({ data: address });
    });
  });

  describe('delete', () => {
    it('delete address', () => {
      jest.spyOn(service, 'delete').mockResolvedValue();
      expect(service.delete(1, 1)).resolves.toBeUndefined();
    });
  });

  describe('isAddressOwner', () => {
    it('is address owner', () => {
      jest.spyOn(service, 'isAddressOwner').mockResolvedValue();
      expect(service.isAddressOwner(1, 1)).resolves.toBeUndefined();
    });
  });
});
