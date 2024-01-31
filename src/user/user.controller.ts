import { Body, Controller, Param, Patch, Get } from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto';
import { UserRO, UsersRO } from './types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<UsersRO> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') paramId: string): Promise<UserRO> {
    return this.userService.findOne(+paramId);
  }

  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id') paramId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserRO> {
    return this.userService.update(+paramId, userId, updateUserDto);
  }

  // @Delete(':id')
  // delete(@GetCurrentUserId() userId: number, @Param('id') paramId: string) {
  //   return this.userService.delete(+paramId, userId);
  // }
}
