import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [PlantController],
  providers: [PlantService, AddressService],
})
export class PlantModule {}
