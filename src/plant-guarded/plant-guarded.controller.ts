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
import { GetCurrentUserId, Permissions } from 'src/auth/common/decorators';
import { PlantGuardedService } from './plant-guarded.service';
import { PlantGuardedRO, PlantsGuardedRO } from './types';
import { CreatePlantGuardedDto, UpdatePlantGuardedDto } from './dto';
import { Roles } from 'src/user/types';

@Controller('plant-guarded')
export class PlantGuardedController {
  constructor(private readonly guardedService: PlantGuardedService) {}

  @Get()
  async findAll(): Promise<PlantsGuardedRO> {
    return await this.guardedService.findAll();
  }

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.create(userId, dto);
  }

  @Permissions(Roles.Gardian)
  @Patch('guard/:id')
  async guard(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.guard(userId, id);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.guardedService.delete(userId, id);
  }
}
