import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePlantGuardedDto } from './plant-guaraded.create.dto';

export class UpdatePlantGuardedDto extends PartialType(
  OmitType(CreatePlantGuardedDto, ['plantId']),
) {}

export const updatePlantGuardedDtoExample: UpdatePlantGuardedDto = {
  from: new Date(),
  to: new Date(),
};
