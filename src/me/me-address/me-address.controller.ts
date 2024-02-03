import { Controller, Get } from '@nestjs/common';
import { MeAddressService } from './me-address.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AddressesRO } from 'src/address/types';

@Controller('me/addresses')
export class MeAddressController {
  constructor(private readonly meAddressService: MeAddressService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: number): Promise<AddressesRO> {
    return await this.meAddressService.findAll(userId);
  }
}
