import { IsNumberString } from 'class-validator';

export class QueryPlantDto {
  @IsNumberString()
  userId: number;
}
