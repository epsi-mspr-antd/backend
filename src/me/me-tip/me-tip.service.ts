import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { tipSelect } from 'src/tip/tip.service';
import { TipsRO } from 'src/tip/types';

@Injectable()
export class MeTipService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<TipsRO> {
    const schoolYears = await this.prismaService.tip.findMany({
      where: { userId },
      select: tipSelect,
    });

    return { data: schoolYears };
  }
}
