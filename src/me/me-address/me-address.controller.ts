import { Controller, Get } from '@nestjs/common';
import { MeAddressService } from './me-address.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AddressesRO } from 'src/address/types';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('me/addresses')
@Controller('me/addresses')
export class MeAddressController {
  constructor(private readonly meAddressService: MeAddressService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all user addresses',
    description: 'Get all addresses for the current user',
  })
  @ApiBearerAuth()
  async findAll(@GetCurrentUserId() userId: number): Promise<AddressesRO> {
    return await this.meAddressService.findAll(userId);
  }
}
