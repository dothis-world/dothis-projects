import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from 'apps/api/src/config/validationsSchema';
import dbConfig from '@Apps/config/database/config/db.env';
import cacheConfig from '@Apps/config/cache/config/cache.env';
import appConfig from '@Apps/config/app/config/app.env';
import opensearchConfig from '@Apps/config/opensearch/config/opensearch.env';
import { TypeormModule } from 'apps/api/src/config/database/database.module';
import { RequestContextModule } from 'nestjs-request-context';
import { HeathApiController } from 'apps/api/src/health.controller';
import { HealthService } from 'apps/api/src/health.service';

import { BusinessModule } from '@Apps/modules/business.modules';
import { CommonModule } from '@Apps/common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from '@Libs/commons';
import { ExceptionInterceptor } from '@Libs/commons';
import { OpenSearchService } from '@Apps/common/opensearch/service/opensearch.service';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];
@Module({
  controllers: [HeathApiController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [dbConfig, cacheConfig, appConfig, opensearchConfig],
      validationSchema,
    }),
    RequestContextModule,
    TypeormModule,
    CommonModule,
    //module
    BusinessModule,
  ],
  providers: [HealthService, ...interceptors, OpenSearchService],
})
export class AppModule {}
