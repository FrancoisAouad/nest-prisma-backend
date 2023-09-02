import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  providers: [OauthService, FacebookStrategy, GoogleStrategy],
  exports: [OauthService],
})
export class OauthModule {}
