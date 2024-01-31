import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, AddressModule, SessionModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
