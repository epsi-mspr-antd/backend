import { Controller, Get } from '@nestjs/common';
import { MeTipService } from './me-tip.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { TipsRO } from 'src/tip/types';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('me/tips')
@Controller('me/tips')
export class MeTipController {
  constructor(private readonly meTipService: MeTipService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all user tips',
    description: 'Get all tips for the current user',
  })
  @ApiBearerAuth()
  async findAll(@GetCurrentUserId() userId: number): Promise<TipsRO> {
    return await this.meTipService.findAll(userId);
  }
}
