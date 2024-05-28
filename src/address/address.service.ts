import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { AddressRO } from './types';

export const addressSelect = {
  id: true,
  name: true,
  street: true,
  zip: true,
  city: true,
  longitude: true,
  latitude: true,
};

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateAddressDto): Promise<AddressRO> {
    const address = await this.prismaService.address.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: addressSelect,
    });

    return { data: address };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateAddressDto,
  ): Promise<AddressRO> {
    await this.isAddressOwner(userId, id);

    const address = await this.prismaService.address.update({
      where: { id },
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: addressSelect,
    });

    return { data: address };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isAddressOwner(userId, id);

    await this.prismaService.address.delete({ where: { id } });
  }

  async isAddressOwner(userId: number, addressId: number): Promise<void> {
    const address = await this.prismaService.address.findUnique({
      where: { id: addressId, userId },
      select: { userId: true },
    });

    if (!address) {
      throw new UnauthorizedException('This address does not exist');
    }
  }
}
