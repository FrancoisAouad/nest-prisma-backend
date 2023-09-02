import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { Logger } from '../../global/logger/logger';
import { Oauth } from './oauth.interface';

@Injectable()
export class OauthService {
  constructor(private readonly logger: Logger) {}

  public async googleAuth(req: Request): Promise<void> {
    this.logger.info(`Attempt at google login::${req.headers.host}`, { service: 'oauthService', strategy: 'google' });
  }

  public googleAuthRedirect(req: Request): string | Oauth {
    if (!req.user) {
      return 'No user from google';
    }
    return { message: 'User Info from Google', user: req.user };
  }

  public async facebookAuth(req: Request): Promise<void> {
    this.logger.info(`Attempt at google login::${req.headers.host}`, { service: 'oauthService', strategy: 'google' });
  }

  public async facebookAuthRedirect(req: Request): Promise<string | Oauth> {
    if (!req.user) {
      return 'No user from facebook';
    }

    return { message: 'User Info from facebook', user: req.user };
  }
}
