import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseInterceptors, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { Role } from '../../config/enums';
import { Roles } from '../../global/global.decorator';
import { RoleGuard } from '../../global/guards/roles.guard';
import { GlobalInterceptor } from '../../global/global.interceptor';

@ApiTags('Health')
@Controller('health')
@UseGuards(RoleGuard)
@UseInterceptors(GlobalInterceptor)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async getHealth() {
    return this.healthService.getHealth();
  }
}
