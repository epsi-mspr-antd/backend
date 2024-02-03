import { Module } from '@nestjs/common';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';
import { PlantService } from 'src/plant/plant.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [TipController],
  providers: [TipService, PlantService, AddressService],
})
export class TipModule {}
