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
import { UpdateUserDto, updateUserDtoExample } from './dto';
import { UserRO, UsersRO } from './types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users.',
  })
  @ApiBearerAuth()
  findAll(): Promise<UsersRO> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieve a user by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to retrieve',
    type: Number,
  })
  @ApiBearerAuth()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRO> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description: "Update a user's information by their ID.",
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to update',
    type: Number,
  })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      default: {
        summary: 'Default example',
        value: updateUserDtoExample,
      },
    },
  })
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
