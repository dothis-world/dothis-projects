import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindDailyViewsOsV3HttpController } from '@Apps/modules/daily_views/queries/v3/find-daily-views/find-daily-views.v3.http.controller';
import { FindDailyViewsQueryOsV3Handler } from '@Apps/modules/daily_views/queries/v3/find-daily-views/find-daily-views.v3.query-handler';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
const controllers = [FindDailyViewsOsV3HttpController];
const repositories: Provider[] = [
  FindDailyViewsQueryOsV3Handler,
  VideoAggregateService,
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
];
@Module({
  imports: [CqrsModule, AwsModule],
  providers: [...repositories],
  controllers,
})
export class DailyViewsApiV3Module {}
