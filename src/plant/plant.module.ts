import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { AddressService } from 'src/address/address.service';
import { PicService } from 'src/pic/pic.service';

@Module({
  controllers: [PlantController],
  providers: [PlantService, AddressService, PicService],
})
export class PlantModule {}
