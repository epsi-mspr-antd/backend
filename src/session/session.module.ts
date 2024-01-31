import { Module } from '@nestjs/common';
import { SessionsService } from './session.service';

@Module({
  providers: [SessionsService],
})
export class SessionsModule {}
