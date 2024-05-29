import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SessionModule } from './session/session.module';
import { PlantSpeciesModule } from './plant-species/plant-species.module';
import { PlantStatusModule } from './plant-status/plant-status.module';
import { PlantModule } from './plant/plant.module';
import { MeModule } from './me/me.module';
import { TipModule } from './tip/tip.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    AddressModule,
    SessionModule,
    PlantSpeciesModule,
    PlantStatusModule,
    PlantModule,
    MeModule,
    TipModule,
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
