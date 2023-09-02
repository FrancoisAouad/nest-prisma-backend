import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Logger } from '../logger/logger';
import { HttpException } from '../exceptions/exception';
import { AuthService } from '../../auth/auth.service';
import { HttpRequest } from '../global.interfaces';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: Logger, private readonly authSerice: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<HttpRequest>();
    const accessToken = request?.headers?.authorization.split(' ')[1];
    try {
      this.authSerice.verifyJwt(accessToken, 'jwt.accessToken');
    } catch (err) {
      this.logger.error(`Failed to verify jwt token: ${accessToken}`, { guard: 'AuthenticationGuard' }, { err });
      throw new HttpException({
        status: 403,
        errorCode: 'forbidden',
        errorMessage: { en: 'Forbidden Access', ar: 'ممنوع الدخول', fr: 'Accès interdit' },
      });
    }

    return true;
  }
}
