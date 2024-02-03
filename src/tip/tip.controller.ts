import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TipService } from './tip.service';
import { GetCurrentUserId, Permissions } from 'src/auth/common/decorators';
import { CreateTipDto, UpdateTipDto } from './dto';
import { TipRO } from './types';
import { Roles } from 'src/user/types';

@Permissions(Roles.Botanist)
@Controller('tips')
export class TipController {
  constructor(private readonly tipService: TipService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipDto,
  ): Promise<TipRO> {
    return await this.tipService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.tipService.delete(userId, id);
  }
}
