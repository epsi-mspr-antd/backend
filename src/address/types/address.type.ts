import { Address } from '@prisma/client';

interface AddressI
  extends Omit<Address, 'createdAt' | 'updatedAt' | 'userId'> {}

export interface AddressRO {
  data: AddressI;
}

export interface AddressesRO {
  data: AddressI[];
}
