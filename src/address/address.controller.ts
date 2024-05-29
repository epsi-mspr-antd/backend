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
import {
  CreateAddressDto,
  UpdateAddressDto,
  createAddressDtoExample,
  updateAddressDtoExample,
} from './dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AddressRO } from './types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressesService: AddressService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an address',
    description: 'Create a new address for the current user',
  })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateAddressDto,
    examples: {
      default: {
        summary: 'Default example',
        value: createAddressDtoExample,
      },
    },
  })
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.create(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an address',
    description: 'Update an address by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the address to update',
    type: Number,
  })
  @ApiBody({
    type: UpdateAddressDto,
    examples: {
      default: {
        summary: 'Default example',
        value: updateAddressDtoExample,
      },
    },
  })
  @ApiBearerAuth()
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ): Promise<AddressRO> {
    return await this.addressesService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an address',
    description: 'Delete an address by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the address to delete',
    type: Number,
  })
  @ApiBearerAuth()
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.addressesService.delete(userId, id);
  }
}
