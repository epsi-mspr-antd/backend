import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(CreateAuthDto) {}

export const updateUserDtoExample: UpdateUserDto = {
  email: 'johndoe@example.com',
  password: 'password123',
};
