import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlantService } from '../plant/plant.service';
import { CreatePlantGuardedDto } from './dto/plant-guaraded.create.dto';
import { PlantGuardedRO, PlantsGuardedRO } from './types';
import { UpdatePlantGuardedDto } from './dto';

export const plantGuardedSelect = {
  id: true,
  from: true,
  to: true,
  plant: true,
  guard: {
    select: {
      id: true,
      email: true,
      pseudo: true,
    },
  },
};

@Injectable()
export class PlantGuardedService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly plantService: PlantService,
  ) {}

  async findAll(): Promise<PlantsGuardedRO> {
    const plants = await this.prismaService.plantGuardian.findMany({
      where: {
        guardId: null,
        to: {
          gt: new Date(),
        },
      },
      select: plantGuardedSelect,
    });

    return { data: plants };
  }

  async create(
    userId: number,
    dto: CreatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    await this.plantService.isPlantOwner(userId, dto.plantId);

    const plant = await this.prismaService.plantGuardian.create({
      data: {
        from: dto.from,
        to: dto.to,
        plant: { connect: { id: dto.plantId } },
      },
      select: plantGuardedSelect,
    });

    return { data: plant };
  }

  async guard(userId: number, id: number): Promise<PlantGuardedRO> {
    await this.isPlantGuardable(id);

    const plant = await this.prismaService.plantGuardian.update({
      where: { id: id },
      data: {
        guard: { connect: { id: userId } },
      },
      select: plantGuardedSelect,
    });

    return { data: plant };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    await this.plantService.isPlantOwner(userId, id);

    const plant = await this.prismaService.plantGuardian.update({
      where: { id: id },
      data: {
        ...dto,
      },
      select: plantGuardedSelect,
    });

    return { data: plant };
  }

  async delete(userId: number, id: number): Promise<void> {
    const plant = await this.prismaService.plantGuardian.findUnique({
      where: { id },
      select: { plantId: true },
    });

    if (!plant) {
      throw new UnauthorizedException('Plant does not exist');
    }

    await this.plantService.isPlantOwner(userId, plant.plantId);

    await this.prismaService.plantGuardian.delete({ where: { id } });
  }

  async isPlantGuardable(plantId: number): Promise<void> {
    const plant = await this.prismaService.plantGuardian.findFirst({
      where: {
        plantId: plantId,
        guardId: null,
        to: {
          gt: new Date(),
        },
      },
      select: { id: true },
    });

    if (!plant) {
      throw new UnauthorizedException('Plant does not exist');
    }
  }
}
