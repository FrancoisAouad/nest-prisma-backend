import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Role } from '../config/enums';
import { HttpRequest } from './global.interfaces';

/**
 * @decorator Returns specific type of data from the headers
 */
export const ReqData = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<HttpRequest>();
  return data ? request?.[data] : {};
});

/**
 * @decorator Used to disable log message when sending sensitive data
 */
export const DisableLog = () => SetMetadata('disableLog', true);

/**
 * @decorator Used to set specific role for an api
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
