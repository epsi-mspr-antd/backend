import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlantDto, UpdatePlantDto } from './dto';
import { PlantRO, PlantsRO } from './types';
import { AddressService } from 'src/address/address.service';
import { getRelationUpdate } from 'src/utils';

export const plantSelect = {
  id: true,
  name: true,
  status: true,
  species: true,
};

@Injectable()
export class PlantService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addressService: AddressService,
  ) {}

  async findAll(userId: number): Promise<PlantsRO> {
    const plants = await this.prismaService.plant.findMany({
      where: { userId },
      select: plantSelect,
    });

    return { data: plants };
  }

  async create(userId: number, dto: CreatePlantDto): Promise<PlantRO> {
    await this.addressService.isAddressOwner(userId, dto.addressId);

    const plant = await this.prismaService.plant.create({
      data: {
        name: dto.name,
        species: { connect: { id: dto.speciesId } },
        status: { connect: { id: dto.statusId } },
        address: { connect: { id: dto.addressId } },
        user: { connect: { id: userId } },
      },
      select: plantSelect,
    });

    return { data: plant };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdatePlantDto,
  ): Promise<PlantRO> {
    const { speciesId, statusId, addressId, ...data } = dto;

    await this.isPlantOwner(userId, id);

    if (addressId) {
      await this.addressService.isAddressOwner(userId, addressId);
    }

    const plant = await this.prismaService.plant.update({
      where: { id: id },
      data: {
        species: getRelationUpdate(speciesId),
        status: getRelationUpdate(statusId),
        address: getRelationUpdate(addressId),
        ...data,
      },
      select: plantSelect,
    });

    return { data: plant };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isPlantOwner(userId, id);

    await this.prismaService.plant.delete({ where: { id } });
  }

  async isPlantOwner(userId: number, plantId: number): Promise<void> {
    const plant = await this.prismaService.plant.findUnique({
      where: { id: plantId, userId },
      select: { userId: true },
    });

    if (!plant) {
      throw new UnauthorizedException('This plant does not exist');
    }
  }

  async isPlantExists(plantId: number): Promise<void> {
    const plant = await this.prismaService.plant.findUnique({
      where: { id: plantId },
      select: { id: true },
    });

    if (!plant) {
      throw new UnauthorizedException('This plant does not exist');
    }
  }
}
