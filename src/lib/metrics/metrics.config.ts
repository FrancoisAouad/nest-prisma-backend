import { Histogram } from 'prom-client';

export const getRestResponseTimeHistogram = new Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});
