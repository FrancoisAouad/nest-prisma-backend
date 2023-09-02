import { join } from 'lodash';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import config from './config/config';
import { Logger } from './global/logger/logger';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user/user.service';
import { MailModule } from './utils/nodemailer.module';
import { AuthRepository } from './auth/auth.repository';
import { PrismaModule } from './lib/prisma/prisma.module';
import { HealthModule } from './lib/health/health.module';
import { ProductModule } from './products/products.module';
import { PrismaService } from './lib/prisma/prisma.service';
import { LoggerModule } from './global/logger/logger.module';
import { GlobalMiddleware } from './global/global.middleware';
import { CategoryModule } from './categories/categories.module';

@Module({
  providers: [AuthService, AuthRepository, UserService, Logger, PrismaService],
  imports: [
    /* Global Modules */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ...(config().app.nodeEnv.toLowerCase() === 'integration' ? { envFilePath: join(process.cwd(), `.env.integration`) } : {}),
    }),
    JwtModule.register({ global: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: config().cache.host,
      port: config().cache.port,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    LoggerModule,
    PrismaModule,
    /* Non Global Module */
    AuthModule,
    MailModule,
    HealthModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalMiddleware).forRoutes('*');
  }
}
