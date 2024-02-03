import { Module } from '@nestjs/common';
import { MeAddressController } from './me-address.controller';
import { MeAddressService as MeAddressService } from './me-address.service';

@Module({
  controllers: [MeAddressController],
  providers: [MeAddressService],
})
export class MeAddressModule {}
