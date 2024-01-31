import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Session } from './types';

@Injectable()
export class SessionService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: number): Promise<Session> {
    const sessions = await this.prismaService.session.findUnique({
      where: { userId },
      select: {
        token: true,
      },
    });

    return sessions;
  }

  async findOrCreate(userId: number, refreshToken: string): Promise<void> {
    await this.prismaService.session.upsert({
      where: { userId },
      update: { token: refreshToken },
      create: { userId, token: refreshToken },
    });
  }

  async delete(userId: number): Promise<void> {
    await this.prismaService.session.delete({ where: { userId } });
  }
}
