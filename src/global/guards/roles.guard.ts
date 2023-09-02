import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Logger } from '../logger/logger';
import { HttpException } from '../exceptions/exception';
import { Role } from '../../config/enums';
import { HttpRequest } from '../global.interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: Logger) {}

  async canActivate(ctx: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [ctx.getHandler(), ctx.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = ctx.switchToHttp().getRequest<HttpRequest>();
    const isAuthorized = requiredRoles.some((role) => user?.role === role);

    if (!isAuthorized) {
      const err = new HttpException({
        status: 403,
        errorCode: 'forbidden',
        errorMessage: { en: 'Forbidden Access', ar: 'ممنوع الدخول', fr: 'Accès interdit' },
      });
      this.logger.error(`Forbidden access attempted by user with Id: ${user?.id}`, { guard: 'RoleGuard' }, { err });
      throw err;
    }
    return isAuthorized;
  }
}
