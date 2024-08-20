import { Module, Provider } from '@nestjs/common';
import {
  ANALYSIS_HITS_V2_SERVICE_DI_TOKEN,
  DAILY_HITS_V2_SERVICE_IGNITE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { GetWeeklyHitsListV2HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v2/get-weekly-hits-list/get-weekly-hits-list.v2.http.controller';
import { WeeklyHitsV2Service } from '@Apps/modules/hits/application/services/weekly-hits.v2.service';
import { GetWeeklyHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v2.query-handler';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalysisHitsV2Service } from '@Apps/modules/hits/application/services/analysis-hits.v2.service';
import { AnalysisHitsV2Controller } from '@Apps/modules/hits/interfaces/http/controllers/v2/analysis-hits/analysis-hits.http.v2.controller';
import { VideoCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.cache.adapter';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { AnalysisHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/analysis-hits.v2.query-handler';
import { GetDailyHitsV2HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v2/get-daily-hits/get-daily-hits.v2.http.controller';
import { GetDailyHitsV2Service } from '@Apps/modules/hits/application/services/get-daily-hits.v2.service';
import { GetDailyHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/get-daliy-hits.v2.query-handler';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';

const controllers = [
  GetWeeklyHitsListV2HttpController,
  AnalysisHitsV2Controller,
  GetDailyHitsV2HttpController,
];
const query: Provider[] = [
  GetWeeklyHitsV2QueryHandler,
  AnalysisHitsV2QueryHandler,
  GetDailyHitsV2QueryHandler,
];
const service: Provider[] = [
  { provide: WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN, useClass: WeeklyHitsV2Service },
  {
    provide: ANALYSIS_HITS_V2_SERVICE_DI_TOKEN,
    useClass: AnalysisHitsV2Service,
  },
  {
    provide: DAILY_HITS_V2_SERVICE_IGNITE_DI_TOKEN,
    useClass: GetDailyHitsV2Service,
  },
];
const repository: Provider[] = [
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
];
@Module({
  imports: [CqrsModule, WeeklyHitsEntityModule, RelatedWordsModule],
  controllers,
  providers: [...service, ...query, ...repository],
})
export class HitsV2Module {}
