import { Module } from '@nestjs/common';
import { MeAddressModule } from './me-address/me-address.module';

@Module({
  imports: [MeAddressModule],
})
export class MeModule {}
