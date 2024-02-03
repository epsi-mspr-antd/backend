import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipDto, UpdateTipDto } from './dto';
import { TipRO } from './types';
import { PlantService } from 'src/plant/plant.service';

export const tipSelect = {
  id: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class TipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly plantService: PlantService,
  ) {}

  async create(userId: number, dto: CreateTipDto): Promise<TipRO> {
    await this.plantService.isPlantExists(dto.plantId);

    const tip = await this.prismaService.tip.create({
      data: {
        description: dto.description,
        plant: { connect: { id: dto.plantId } },
        user: { connect: { id: userId } },
      },
      select: tipSelect,
    });

    return { data: tip };
  }

  async update(userId: number, id: number, dto: UpdateTipDto): Promise<TipRO> {
    await this.isTipOwner(userId, id);

    const tip = await this.prismaService.tip.update({
      where: { id },
      data: dto,
      select: tipSelect,
    });

    return { data: tip };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isTipOwner(userId, id);

    await this.prismaService.tip.delete({ where: { id } });
  }

  async isTipOwner(userId: number, id: number): Promise<void> {
    const tip = await this.prismaService.tip.findUnique({
      where: { id, userId },
      select: { userId: true },
    });

    if (!tip) {
      throw new UnauthorizedException('This tip does not exist');
    }
  }
}
