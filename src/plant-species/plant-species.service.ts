import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlantSpeciesRO } from './types';

@Injectable()
export class PlantSpeciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PlantSpeciesRO> {
    const species = await this.prismaService.plantSpecies.findMany();

    return { data: species };
  }
}
