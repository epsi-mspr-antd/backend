import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(CreateAuthDto) {}
