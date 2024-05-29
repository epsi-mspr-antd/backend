import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlantGuardedDto {
  @IsDateString()
  from: Date;

  @IsDateString()
  to: Date;

  @IsNotEmpty()
  @IsNumber()
  plantId: number;
}

export const createPlantGuardedDtoExample: CreatePlantGuardedDto = {
  from: new Date(),
  to: new Date(),
  plantId: 1,
};
