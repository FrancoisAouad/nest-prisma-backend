import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  public constructor(private readonly prismaSrvice: PrismaService) {}

  async getHealth() {
    try {
      await this.prismaSrvice.checkDatabaseConnection();
      return { statusCode: 200, status: 'up', dateTime: moment() };
    } catch (err) {
      return { statusCode: 500, status: 'down', dateTime: moment() };
    }
  }
}
