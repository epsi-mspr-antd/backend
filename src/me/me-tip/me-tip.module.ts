import { Module } from '@nestjs/common';
import { MeTipController } from './me-tip.controller';
import { MeTipService } from './me-tip.service';

@Module({
  controllers: [MeTipController],
  providers: [MeTipService],
})
export class MeTipModule {}
