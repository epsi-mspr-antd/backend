import { Controller, Get } from '@nestjs/common';
import { PlantSpeciesService } from './plant-species.service';
import { PlantSpeciesRO } from './types';

@Controller('plant-species')
export class PlantSpeciesController {
  constructor(private readonly plantSpeciesService: PlantSpeciesService) {}

  @Get()
  async findAll(): Promise<PlantSpeciesRO> {
    return await this.plantSpeciesService.findAll();
  }
}
