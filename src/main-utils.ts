import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import config from './config/config';
import { Logger } from './global/logger/logger';
import { MetricsModule } from './lib/metrics/metrics.module';
import { HttpExceptionFilter } from './global/exceptions/exceptions-filter';

/**
 *
 * @function initPrometheus - Function that starts the prometheus metrics server
 * @param {Logger} logger - Logger singleton to be passed
 */
export const initPrometheus = async (logger: Logger) => {
  const options: NestApplicationOptions = { logger: false };
  const app = await NestFactory.create(MetricsModule, options);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config().prometheus.port, () => {
    logger.info(`Prometheus metrics server running on Port: ${config().prometheus.port}`, { origin: 'metrics' });
  });
};

/**
 *
 * @function initMiddleware - Function initializes all utility middleware for the backend
 * @param {INestApplication} app - Application instance to be passed in the bootstrap method
 */
export const initMiddleware = (app: INestApplication) => {
  app.use(helmet());
};
