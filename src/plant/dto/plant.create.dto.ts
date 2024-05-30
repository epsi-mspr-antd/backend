import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { transformToInt } from 'src/utils';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => transformToInt(value))
  speciesId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => transformToInt(value))
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => transformToInt(value))
  addressId: number;
}

export const createPlantDtoExample: CreatePlantDto = {
  name: 'Rose',
  speciesId: 1,
  statusId: 2,
  addressId: 3,
};
