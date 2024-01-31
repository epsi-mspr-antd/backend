import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './createAddressDto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
