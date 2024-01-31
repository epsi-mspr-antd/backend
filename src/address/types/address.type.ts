import { Address } from '@prisma/client';

export type AddressRO = {
  data: Omit<Address, 'createdAt' | 'updatedAt' | 'userId'>;
};
