import { Controller, Get } from '@nestjs/common';
import { PlantStatusService } from './plant-status.service';
import { PlantStatusesRO } from './types';

@Controller('plant-status')
export class PlantStatusController {
  constructor(private readonly plantStatusService: PlantStatusService) {}

  @Get()
  async findAll(): Promise<PlantStatusesRO> {
    return await this.plantStatusService.findAll();
  }
}
