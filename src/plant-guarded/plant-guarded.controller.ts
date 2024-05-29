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
import {
  CreatePlantGuardedDto,
  UpdatePlantGuardedDto,
  createPlantGuardedDtoExample,
} from './dto';
import { Roles } from 'src/user/types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { updateAddressDtoExample } from 'src/address/dto';

@ApiTags('plant-guarded')
@Controller('plant-guarded')
export class PlantGuardedController {
  constructor(private readonly guardedService: PlantGuardedService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all plants guarded',
    description: 'Get all plants guarded',
  })
  @ApiBearerAuth()
  async findAll(): Promise<PlantsGuardedRO> {
    return await this.guardedService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a plant guarded',
    description: 'Create a new plant guarded for the current user',
  })
  @ApiBody({
    type: CreatePlantGuardedDto,
    examples: {
      default: {
        summary: 'Default example',
        value: createPlantGuardedDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.create(userId, dto);
  }

  @Permissions(Roles.Gardian)
  @Patch('guard/:id')
  @ApiOperation({
    summary: 'Guard a plant',
    description: 'Guard a plant',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the plant',
    type: Number,
  })
  @ApiBearerAuth()
  async guard(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.guard(userId, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a plant guarded',
    description: 'Update a new plant guarded for the current user',
  })
  @ApiBody({
    type: UpdatePlantGuardedDto,
    examples: {
      default: {
        summary: 'Default example',
        value: updateAddressDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlantGuardedDto,
  ): Promise<PlantGuardedRO> {
    return await this.guardedService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a plant guarded',
    description: 'Delete a plant guarded by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the plant guarded to delete',
    type: Number,
  })
  @ApiBearerAuth()
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.guardedService.delete(userId, id);
  }
}
