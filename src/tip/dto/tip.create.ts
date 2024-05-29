import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTipDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  plantId: number;
}

export const createTipDtoExample: CreateTipDto = {
  description: 'Water your plant every day',
  plantId: 1,
};
