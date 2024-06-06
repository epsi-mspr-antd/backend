import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipDto, UpdateTipDto } from './dto';
import { TipRO, TipsRO } from './types';
import { PlantService } from 'src/plant/plant.service';
import { userSelect } from 'src/user/user.service';
import { PicService } from 'src/pic/pic.service';

export const tipSelect = {
  id: true,
  image: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  user: { select: userSelect },
};

@Injectable()
export class TipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly plantService: PlantService,
    private readonly picService: PicService,
  ) {}

  async findOne(tipId: number): Promise<TipRO> {
    const plant = await this.prismaService.tip.findFirst({
      where: { id: tipId },
      select: tipSelect,
    });

    return {
      data: {
        ...plant,
      },
    };
  }

  async findPlantTips(plantId: number): Promise<TipsRO> {
    const plants = await this.prismaService.tip.findMany({
      where: { plantId },
      select: tipSelect,
    });

    return {
      data: plants.map((plant) => ({
        ...plant,
        user: {
          ...plant.user,
          roles: plant.user.roles.map((role) => role.name),
        },
      })),
    };
  }

  async create(
    userId: number,
    dto: CreateTipDto,
    file: Express.Multer.File,
  ): Promise<TipRO> {
    await this.plantService.isPlantExists(dto.plantId);

    const image = file ? await this.picService.create(file) : null;

    const tip = await this.prismaService.tip.create({
      data: {
        image,
        description: dto.description,
        plant: { connect: { id: dto.plantId } },
        user: { connect: { id: userId } },
      },
      select: tipSelect,
    });

    return { data: tip };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateTipDto,
    file: Express.Multer.File,
  ): Promise<TipRO> {
    await this.isTipOwner(userId, id);

    const updatedData: any = {
      ...dto,
    };

    if (file) {
      const currentTip = await this.prismaService.tip.findUnique({
        where: { id: id },
        select: { image: true },
      });

      if (currentTip?.image) {
        await this.picService.delete(currentTip.image);
      }

      updatedData.image = await this.picService.create(file);
    }

    const tip = await this.prismaService.tip.update({
      where: { id },
      data: updatedData,
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
