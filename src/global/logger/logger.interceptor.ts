import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { tap, catchError, Observable } from 'rxjs';
import { Logger } from './logger';
import { HttpException } from '../exceptions/exception';
import { HttpRequest, LogMessageOptions } from '../global.interfaces';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger, private readonly reflector: Reflector) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest<HttpRequest>();
    const controllerName = ctx.getClass().name;
    const handlerName = ctx.getHandler().name;
    const method = req?.method;
    const url = req?.url;
    const now = Date.now();
    const body = req?.body;
    //TODO: log messages at service level should only be use for debug logs, only custom error mmessages
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const disableLog = this.reflector.getAllAndOverride<boolean[]>('disableLog', [ctx.getHandler(), ctx.getClass()]);
        if (!disableLog) {
          const logMessage = this.handleLogMessage({ responseTime, body });
          this.logger.info(logMessage, { origin: 'interceptor', controller: controllerName, method, url, api: handlerName });
        }
      }),
      catchError((error: HttpException | Error): Observable<HttpException | Error> => {
        const responseTime = Date.now() - now;
        const logMessage = this.handleLogMessage({ responseTime, body, error });
        this.logger.error(logMessage, { origin: 'interceptor', controller: controllerName, method, url, api: handlerName }, { err: error });
        throw error;
      }),
    );
  }

  /**
   * @function handleLogMessage - Helper function that returns updated message
   * @param {LogMessageOptions} loggingOptions
   * @returns
   */
  private handleLogMessage = (loggingOptions: LogMessageOptions) => {
    const { responseTime, body, error } = loggingOptions;
    const isError = Boolean(error);
    let logMessage = isError
      ? `Error occurred while processing request. Threw an exception after ${responseTime}ms.`
      : `Executed response within ${responseTime}ms.`;
    if (body && Object.keys(body)?.length > 0) {
      logMessage += ` Request body: ${JSON.stringify(body)}`;
    }
    return logMessage;
  };
}
