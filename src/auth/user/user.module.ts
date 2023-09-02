import { Module } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from './user.service';
import { AuthRepository } from '../auth.repository';

@Module({
  providers: [AuthService, UserService, AuthRepository],
  exports: [UserService],
})
export class UserModule {}
