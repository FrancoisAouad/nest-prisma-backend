import { Response } from 'express';
import values from '../../config/default-values';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from './exception';
import { HttpRequest, Message } from '../global.interfaces';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<HttpRequest>();
    const lang = request?.headers['accept-language'];
    const { status, message } = HttpExceptionFilter.handleExceptionType(exception, request, lang);
    response.status(status).send({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url,
      message: message,
    });
  }

  private static handleExceptionType(exception: HttpException | Error, request: HttpRequest, lang = 'en') {
    let status: number;
    let message: string[] | string;
    const langMessage = !values().allowedLanguages.includes(lang) ? 'en' : lang;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorMessage: Message = exception.getErrorMessage();
      message = [errorMessage[langMessage]];
    } else if (exception instanceof Error) {
      status = 400;
      const obj = exception['response'] ?? {};
      if (obj && Object.keys(obj)?.length > 0) {
        message = obj['message'];
      } else {
        message = Array.isArray(exception?.message) ? exception?.message : [exception?.message];
      }
    }
    return { status, message };
  }
}
