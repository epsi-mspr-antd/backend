import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './plant.create.dto';

export class UpdatePlantDto extends PartialType(CreatePlantDto) {}
