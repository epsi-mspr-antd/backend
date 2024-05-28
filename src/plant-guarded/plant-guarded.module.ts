import { Module } from '@nestjs/common';
import { PlantGuardedController } from './plant-guarded.controller';
import { PlantGuardedService } from './plant-guarded.service';
import { PlantService } from '../plant/plant.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [PlantGuardedController],
  providers: [PlantGuardedService, PlantService, AddressService],
})
export class PlantGuardedModule {}
