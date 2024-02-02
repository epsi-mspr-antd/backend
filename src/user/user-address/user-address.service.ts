import { Injectable } from '@nestjs/common';
import { addressSelect } from 'src/address/address.service';
import { AddressesRO } from 'src/address/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<AddressesRO> {
    const schoolYears = await this.prismaService.address.findMany({
      where: { userId },
      select: addressSelect,
    });

    return { data: schoolYears };
  }
}
