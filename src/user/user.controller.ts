import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { UserRO, UsersRO } from './types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UsersRO> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRO> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserRO> {
    return this.userService.update(userId, id, dto);
  }

  // @Delete(':id')
  // delete(@GetCurrentUserId() userId: number, @Param('id') paramId: string) {
  //   return this.userService.delete(+paramId, userId);
  // }
}
