import { createLogger, transports, LoggerOptions, format } from 'winston';
import { Injectable } from '@nestjs/common';
import { CustomObject, LoggerErrorMetadata } from '../global.interfaces';
import config from '../../config/config';

@Injectable()
export class Logger {
  private options: LoggerOptions = {
    format: Logger.getFormat(),
    transports: Logger.createTransport(),
  };

  public info = (message: string, labels: CustomObject, hideBody?: boolean): void => {
    createLogger(this.options).info(message, { label: labels, hide: hideBody });
  };

  public error = (message: string, labels: CustomObject, errorMetadata?: LoggerErrorMetadata): void => {
    createLogger(this.options).error(message, { label: labels, error: errorMetadata });
  };

  public warn = (message: string, labels: CustomObject, errorMetadata?: LoggerErrorMetadata): void => {
    createLogger(this.options).warn(message, { label: labels, error: errorMetadata });
  };

  public debug = (message: string, labels: CustomObject): void => {
    createLogger(this.options).debug(message, { label: labels });
  };

  private static createTransport(labels?: CustomObject, metadata?: LoggerErrorMetadata) {
    const customTransports = [];

    if (config().application_logging.file) {
      customTransports.push(
        new transports.File({ filename: config().application_logging.file, level: config().application_logging.level, ...labels, ...metadata }),
      );
    }

    if (config().application_logging.console) {
      customTransports.push(new transports.Console({ level: config().application_logging.level, ...labels, ...metadata }));
    }

    return customTransports;
  }

  private static getFormat() {
    const lokiFormat = format.printf(({ level, message, label, ...meta }) => {
      const logEntry = { timestamp: new Date(), level, message, label: { ...label, ...meta } };
      return JSON.stringify(logEntry);
    });
    return lokiFormat;
  }
}
