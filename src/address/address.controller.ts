import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AddressRO } from './types';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressesService: AddressService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.addressesService.delete(userId, id);
  }
}
