import { Module } from '@nestjs/common';
import { PicService } from './pic.service';

@Module({
  providers: [PicService],
})
export class PicModule {}
