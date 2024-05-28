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
import { CreateTipDto, UpdateTipDto } from './dto';
import { TipRO, TipsRO } from './types';
import { Roles } from 'src/user/types';

@Controller('tips')
export class TipController {
  constructor(private readonly tipService: TipService) {}

  @Get('plant/:id')
  async findPlantTips(@Param('id', ParseIntPipe) id: number): Promise<TipsRO> {
    return await this.tipService.findPlantTips(id);
  }

  @Permissions(Roles.Botanist)
  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.create(userId, dto);
  }

  @Permissions(Roles.Botanist)
  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.update(userId, id, dto);
  }

  @Permissions(Roles.Botanist)
  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.tipService.delete(userId, id);
  }
}
