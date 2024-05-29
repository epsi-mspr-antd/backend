import { Controller, Get } from '@nestjs/common';
import { PlantSpeciesService } from './plant-species.service';
import { PlantSpeciesRO } from './types';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('plant-species')
@Controller('plant-species')
export class PlantSpeciesController {
  constructor(private readonly plantSpeciesService: PlantSpeciesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all plant species',
    description: 'Get all plant species',
  })
  @ApiBearerAuth()
  async findAll(): Promise<PlantSpeciesRO> {
    return await this.plantSpeciesService.findAll();
  }
}
