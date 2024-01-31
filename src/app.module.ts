import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UsersModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SessionsModule } from './session/session.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    AddressModule,
    SessionsModule,
  ],
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
