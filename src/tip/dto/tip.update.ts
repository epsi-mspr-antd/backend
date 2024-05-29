import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTipDto } from './tip.create';

export class UpdateTipDto extends PartialType(
  OmitType(CreateTipDto, ['plantId']),
) {}

export const updateTipDtoExample: UpdateTipDto = {
  description: 'Water your plant every day',
};
