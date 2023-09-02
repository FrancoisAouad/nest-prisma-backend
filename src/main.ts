import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import config from './config/config';
import { AppModule } from './app.module';
import { Logger } from './global/logger/logger';
import { initPrometheus, initMiddleware } from './main-utils';
import { HttpExceptionFilter } from './global/exceptions/exceptions-filter';

class App {
  public static async bootstrap() {
    /* Application setup */
    const appOptions: NestApplicationOptions = { cors: true, logger: false };
    const app = await NestFactory.create(AppModule, appOptions);
    const logger = app.get(Logger);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    // TODO: google auth callback only works without versioning
    app.setGlobalPrefix('api/v2');

    /* Initialize Prometheus server */
    initPrometheus(logger);

    /* Initialize Middleware */
    initMiddleware(app);

    /* Start Application */
    await app.listen(config().app.port, () => {
      logger.info(`Application Listening on Port: ${config().app.port}`, { origin: 'system' });
    });
  }
}

App.bootstrap();
