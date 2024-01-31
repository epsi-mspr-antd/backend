import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRO, UsersRO } from './types';

const selectUser = {
  id: true,
  email: true,
  roles: {
    select: {
      name: true,
    },
  },
};

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UsersRO> {
    const users = await this.prismaService.user.findMany({
      select: selectUser,
    });

    return {
      data: users.map((user) => ({
        ...user,
        roles: user.roles.map((role) => role.name),
      })),
    };
  }

  async findOne(userId: number): Promise<UserRO> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: selectUser,
    });

    const roles = user.roles.map((role) => role.name);

    return { data: { ...user, roles } };
  }

  async update(
    paramId: number,
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserRO> {
    await this.isUserOwner(userId, paramId);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: selectUser,
    });

    const roles = user.roles.map((role) => role.name);

    return { data: { ...user, roles } };
  }

  async delete(paramId: number, userId: number): Promise<void> {
    await this.isUserOwner(userId, paramId);

    await this.prismaService.user.delete({ where: { id: userId } });
  }

  async isUserOwner(userId: number, paramId: number): Promise<void> {
    if (userId !== paramId) {
      throw new UnauthorizedException();
    }
  }
}
