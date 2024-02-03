import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PlantService } from './plant.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CreatePlantDto, UpdatePlantDto } from './dto';
import { PlantRO, PlantsRO } from './types';

@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get('user/:id')
  async findUserPlants(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlantsRO> {
    return await this.plantService.findAll(id);
  }

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreatePlantDto,
  ): Promise<PlantRO> {
    return await this.plantService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlantDto,
  ): Promise<PlantRO> {
    return await this.plantService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.plantService.delete(userId, id);
  }
}
