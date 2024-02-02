import { Controller, Get } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AddressesRO } from 'src/address/types';

@Controller('user/addresses')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: number): Promise<AddressesRO> {
    return await this.userAddressService.findAll(userId);
  }
}
