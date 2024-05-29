import { Controller, Get } from '@nestjs/common';
import { PlantStatusService } from './plant-status.service';
import { PlantStatusesRO } from './types';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('plant-status')
@Controller('plant-status')
export class PlantStatusController {
  constructor(private readonly plantStatusService: PlantStatusService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all plant statuses',
    description: 'Get all plant statuses',
  })
  @ApiBearerAuth()
  async findAll(): Promise<PlantStatusesRO> {
    return await this.plantStatusService.findAll();
  }
}
