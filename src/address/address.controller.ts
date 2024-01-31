import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
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
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.create(userId, createAddressDto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.update(userId, +id, updateAddressDto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
  ): Promise<void> {
    await this.addressesService.delete(userId, +id);
  }
}
