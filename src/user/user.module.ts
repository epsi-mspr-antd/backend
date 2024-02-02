import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserAddressModule } from './user-address/user-address.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UserAddressModule],
})
export class UserModule {}
