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
import { TipService } from './tip.service';
import { GetCurrentUserId, Permissions } from 'src/auth/common/decorators';
import {
  CreateTipDto,
  UpdateTipDto,
  createTipDtoExample,
  updateTipDtoExample,
} from './dto';
import { TipRO, TipsRO } from './types';
import { Roles } from 'src/user/types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tips')
@Controller('tips')
export class TipController {
  constructor(private readonly tipService: TipService) {}

  @Get('plant/:id')
  @ApiOperation({
    summary: 'Get all tips for a plant',
    description: 'Get all tips for a plant by plant ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the plant',
    type: Number,
  })
  @ApiBearerAuth()
  async findPlantTips(@Param('id', ParseIntPipe) id: number): Promise<TipsRO> {
    return await this.tipService.findPlantTips(id);
  }

  @Permissions(Roles.Botanist)
  @Post()
  @ApiOperation({
    summary: 'Create a tip',
    description: 'Create a tip',
  })
  @ApiBody({
    type: CreateTipDto,
    examples: {
      default: {
        summary: 'Default example',
        value: createTipDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.create(userId, dto);
  }

  @Permissions(Roles.Botanist)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a tip',
    description: 'Update a tip',
  })
  @ApiBody({
    type: UpdateTipDto,
    examples: {
      default: {
        summary: 'Default example',
        value: updateTipDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.update(userId, id, dto);
  }

  @Permissions(Roles.Botanist)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tip',
    description: 'Delete a tip by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the tip to delete',
    type: Number,
  })
  @ApiBearerAuth()
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.tipService.delete(userId, id);
  }
}
