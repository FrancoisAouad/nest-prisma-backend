import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../../global/logger/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor(@Inject(Logger) private readonly logger: Logger) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      throw e;
    }
  }
  /**
   * @function checkDatabaseConnection - Method used in Health module to check for connection
   */
  async checkDatabaseConnection() {
    try {
      await this.onModuleInit();
    } catch (e) {
      this.logger.error(`Failed to connect to Database`, { system: 'database' }, { err: e });
    }
  }
}
