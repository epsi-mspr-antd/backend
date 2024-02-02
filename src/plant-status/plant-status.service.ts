import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlantStatusesRO } from './types';

@Injectable()
export class PlantStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PlantStatusesRO> {
    const status = await this.prismaService.plantStatus.findMany();

    return { data: status };
  }
}
