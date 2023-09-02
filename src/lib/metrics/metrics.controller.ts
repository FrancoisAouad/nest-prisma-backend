import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { MetricService } from './metrics.service';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  /**
   * @Api - Generate Metrics
   * @method GET
   */
  @Get()
  generateMetrics() {
    return this.metricService.generateMetrics();
  }
}
