import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { transformToInt } from 'src/utils';

export class CreateTipDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => transformToInt(value))
  plantId: number;
}

export const createTipDtoExample: CreateTipDto = {
  description: 'Water your plant every day',
  plantId: 1,
};
