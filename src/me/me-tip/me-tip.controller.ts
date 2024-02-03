import { Controller, Get } from '@nestjs/common';
import { MeTipService } from './me-tip.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { TipsRO } from 'src/tip/types';

@Controller('me/tips')
export class MeTipController {
  constructor(private readonly meTipService: MeTipService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: number): Promise<TipsRO> {
    return await this.meTipService.findAll(userId);
  }
}
