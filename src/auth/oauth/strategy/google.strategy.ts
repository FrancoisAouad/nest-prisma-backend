import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import config from '../../../config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor() {
    super({
      clientID: config().oauth.google.clientId,
      clientSecret: config().oauth.google.clientSecret,
      callbackURL: config().oauth.google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    done(null, profile);
  }
}
