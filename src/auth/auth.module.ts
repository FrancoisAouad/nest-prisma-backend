import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { OauthModule } from './oauth/oauth.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AuthController],
  imports: [OauthModule, UserModule],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
