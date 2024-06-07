import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlantDto, UpdatePlantDto } from './dto';
import { PlantRO, PlantsRO } from './types';
import { AddressService } from 'src/address/address.service';
import { getRelationUpdate } from 'src/utils';
import { PicService } from 'src/pic/pic.service';

export const plantSelect = {
  id: true,
  name: true,
  image: true,
  status: true,
  species: true,
  address: true,
  user: {
    select: {
      id: true,
      email: true,
      pseudo: true,
    },
  },
  guard: {
    select: {
      id: true,
      email: true,
      pseudo: true,
    },
  },
};

@Injectable()
export class PlantService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addressService: AddressService,
    private readonly picService: PicService,
  ) {}

  async findAll(): Promise<PlantsRO> {
    const plants = await this.prismaService.plant.findMany({
      select: plantSelect,
    });

    return { data: plants };
  }

  async findOne(plantId: number): Promise<PlantRO> {
    const plant = await this.prismaService.plant.findFirst({
      where: { id: plantId },
      select: plantSelect,
    });

    return { data: plant };
  }

  async findUserPlants(userId: number): Promise<PlantsRO> {
    const plants = await this.prismaService.plant.findMany({
      where: { userId },
      select: plantSelect,
    });

    return { data: plants };
  }

  async create(
    userId: number,
    dto: CreatePlantDto,
    file: Express.Multer.File,
  ): Promise<PlantRO> {
    await this.addressService.isAddressOwner(userId, dto.addressId);

    const image = file ? await this.picService.create(file) : null;

    const plant = await this.prismaService.plant.create({
      data: {
        name: dto.name,
        image,
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
    file: Express.Multer.File,
  ): Promise<PlantRO> {
    const { speciesId, statusId, addressId, ...data } = dto;

    await this.isPlantOwner(userId, id);

    if (addressId) {
      await this.addressService.isAddressOwner(userId, addressId);
    }

    const updatedData: any = {
      ...data,
      species: getRelationUpdate(speciesId),
      status: getRelationUpdate(statusId),
      address: getRelationUpdate(addressId),
    };

    if (file) {
      const currentPlant = await this.prismaService.plant.findUnique({
        where: { id: id },
        select: { image: true },
      });

      if (currentPlant?.image) {
        await this.picService.delete(currentPlant.image);
      }

      updatedData.image = await this.picService.create(file);
    }

    const plant = await this.prismaService.plant.update({
      where: { id: id },
      data: updatedData,
      select: plantSelect,
    });

    return { data: plant };
  }

  async fetchAllGuard(guardId: number): Promise<PlantsRO> {
    const plant = await this.prismaService.plant.findMany({
      where: { guardId },
      select: plantSelect,
    });

    return { data: plant };
  }

  async guard(userId: number, id: number): Promise<PlantRO> {
    const plant = await this.prismaService.plant.findFirst({
      where: { id, guardId: null },
      select: plantSelect,
    });

    if (!plant) {
      throw new UnauthorizedException(
        'This plant is already guarded or does not exist',
      );
    }

    const plantUpdated = await this.prismaService.plant.update({
      where: { id },
      data: {
        guard: { connect: { id: userId } },
      },
      select: plantSelect,
    });

    return { data: plantUpdated };
  }

  async unguard(userId: number, id: number): Promise<PlantRO> {
    const plant = await this.prismaService.plant.findFirst({
      where: { id, guardId: userId },
      select: plantSelect,
    });

    if (!plant) {
      throw new UnauthorizedException(
        'This plant is already unguarded or does not exist',
      );
    }

    const plantUpdated = await this.prismaService.plant.update({
      where: { id },
      data: {
        guardId: null,
      },
      select: plantSelect,
    });

    return { data: plantUpdated };
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
