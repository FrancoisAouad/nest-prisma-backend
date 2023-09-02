import { collectDefaultMetrics, register } from 'prom-client';
import { Injectable } from '@nestjs/common';
import { getRestResponseTimeHistogram } from './metrics.config';

@Injectable()
export class MetricService {
  constructor() {
    collectDefaultMetrics();
    this.generateMetrics();
  }

  generateMetrics = async () => {
    const result = await register.metrics();
    return result;
  };

  static registerCustomMetrics = () => {
    register.registerMetric(getRestResponseTimeHistogram);
  };
}
