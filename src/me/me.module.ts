import { Module } from '@nestjs/common';
import { MeAddressModule } from './me-address/me-address.module';
import { MeTipModule } from './me-tip/me-tip.module';

@Module({
  imports: [MeAddressModule, MeTipModule],
})
export class MeModule {}
