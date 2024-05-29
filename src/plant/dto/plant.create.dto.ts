import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  speciesId: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  addressId: number;
}

export const createPlantDtoExample: CreatePlantDto = {
  name: 'Rose',
  speciesId: 1,
  statusId: 2,
  addressId: 3,
};
