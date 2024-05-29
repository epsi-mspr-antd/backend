import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumberString()
  zip: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}

export const createAddressDtoExample: CreateAddressDto = {
  name: 'Maison',
  street: 'Rue de la Paix',
  zip: '75000',
  city: 'Paris',
  longitude: 2.3522,
  latitude: 48.8566,
};
