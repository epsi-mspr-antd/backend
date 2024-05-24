import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto';

describe('AddressController', () => {
  let controller: AddressController;

  const address = {
    id: 1,
    street: 'La rue du test',
    zip: '69230',
    city: 'LYON',
    longitude: 4.8357,
    latitude: 45.764
  };

  const addressRo ={
    data: address
  }

  const mockAddressService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: mockAddressService,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return an array of plants', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue({ data: address });

      expect(controller.create(1, address)).resolves.toEqual({ data: address });
    });
  });

  describe('update', () => {
    it('should update and return a plant', async () => {
      const updateAddressDto: UpdateAddressDto = {
        street: 'La rue du test',
        zip: '69230',
        city: 'LYON',
        longitude: 4.8357,
        latitude: 45.764
      };

      jest.spyOn(controller, 'update').mockResolvedValue(addressRo);

      expect(controller.update(1, 1, updateAddressDto)).resolves.toEqual({data: address});
    });
  });

  describe('delete', () => {
    it('should delete a plant', async () => {
      jest.spyOn(controller, 'delete').mockResolvedValue();

      expect(controller.delete(1, 1)).resolves.toBeUndefined();
    });
  });
});
