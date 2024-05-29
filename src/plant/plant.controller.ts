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
import {
  CreatePlantDto,
  UpdatePlantDto,
  createPlantDtoExample,
  updatePlantDtoExample,
} from './dto';
import { PlantRO, PlantsRO } from './types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('plants')
@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all plants',
    description: 'Get all plants',
  })
  @ApiBearerAuth()
  async findAll(): Promise<PlantsRO> {
    return await this.plantService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Get all plants for a user',
    description: 'Get all plants for a user by user ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user',
    type: Number,
  })
  @ApiBearerAuth()
  async findUserPlants(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlantsRO> {
    return await this.plantService.findUserPlants(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a plant',
    description: 'Create a new plant for the current user',
  })
  @ApiBody({
    type: CreatePlantDto,
    examples: {
      default: {
        summary: 'Default example',
        value: createPlantDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreatePlantDto,
  ): Promise<PlantRO> {
    return await this.plantService.create(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a plant',
    description: 'Update a plant by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the plant to update',
    type: Number,
  })
  @ApiBody({
    type: UpdatePlantDto,
    examples: {
      default: {
        summary: 'Default example',
        value: updatePlantDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlantDto,
  ): Promise<PlantRO> {
    return await this.plantService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a plant',
    description: 'Delete a plant by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the plant to delete',
    type: Number,
  })
  @ApiBearerAuth()
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.plantService.delete(userId, id);
  }
}
