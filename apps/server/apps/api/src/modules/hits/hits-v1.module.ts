import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { GetDailyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-daily-hits/get-daily-hits.v1.http.controller';
import { CalculateDailyHitsMetricsService } from '@Apps/modules/hits/application/services/calculate-daily-hits.service';
import {
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import {
  ANALYSIS_HITS_SERVICE_DI_TOKEN,
  DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
  GET_WEEKLY_KEYWORD_SERVICE_DI_TOKEN,
  PROBABILITY_SUCCESS_SERVICE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_DI_TOKEN,
  WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsService } from '@Apps/modules/hits/application/services/weekly-hits.service';
import { GetWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { WeeklyHitsRepository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.repository';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';

import { VideoHistoryGetListByIdsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.get-list-by-ids.adapter';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { GetProbabilitySuccessHttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-probability-success/get-probability-success.http.controller';
import { GetProbabilitySuccessQueryHandler } from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { GetProbabilitySuccessService } from '@Apps/modules/hits/application/services/get-probability-success.service';
import { GetSomeWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';
import { SomeWeeklyHitsService } from '@Apps/modules/hits/application/services/some-weekly-hits.service';
import { WeeklyHitsV1Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v1.repository';
import { GetSomeWeeklyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-some-weekly-hits/get-some-weekly-hits.v1.http.controller';
import { AnalysisHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/analysis-hits/analysis-hits.v1.http.controller';
import { AnalysisHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/analysis-hits.v1.query-handler';
import { AnalysisHitsService } from '@Apps/modules/hits/application/services/analysis-hits.service';
import { GetWeeklyKeywordQueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-keyword.query-handler';
import { GetWeeklyKeywordService } from '@Apps/modules/hits/application/services/get-weekly-keyword.service';
import { GetWeeklyKeywordHttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-weekly-keyword/get-weekly-keyword.http.controller';
import { VideoCacheAdapter } from '@Apps/modules/video/infrastructure/adapters';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { MockGetChannelHistoryListAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-list.adapter.mock';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { MockGetChannelHistoryByIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-by-id.adapter.mock';

const commands: Provider[] = [];
const queries: Provider[] = [
  GetDailyHitsV1QueryHandler,
  GetWeeklyHitsV1QueryHandler,
  VideoAggregateService,
  GetProbabilitySuccessQueryHandler,
  GetSomeWeeklyHitsV1QueryHandler,
  AnalysisHitsV1QueryHandler,
  GetWeeklyKeywordQueryHandler,
];
const service: Provider[] = [
  {
    provide: DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
    useClass: CalculateDailyHitsMetricsService,
  },
  { provide: WEEKLY_VIEWS_SERVICE_DI_TOKEN, useClass: WeeklyHitsService },
  {
    provide: PROBABILITY_SUCCESS_SERVICE_DI_TOKEN,
    useClass: GetProbabilitySuccessService,
  },
  {
    provide: WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN,
    useClass: SomeWeeklyHitsService,
  },
  {
    provide: ANALYSIS_HITS_SERVICE_DI_TOKEN,
    useClass: AnalysisHitsService,
  },
  {
    provide: GET_WEEKLY_KEYWORD_SERVICE_DI_TOKEN,
    useClass: GetWeeklyKeywordService,
  },
  ChannelHistoryAggregateService,
];
const controllers = [
  GetDailyHitsV1HttpController,
  GetProbabilitySuccessHttpController,
  GetSomeWeeklyHitsV1HttpController,
  AnalysisHitsV1HttpController,
  GetWeeklyKeywordHttpController,
];
const repositories: Provider[] = [
  WeeklyHitsRepository,
  {
    provide: VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetListByIdsAdapter,
  },
  { provide: VIDEO_COUNT_DAY_IGNITE_DI_TOKEN, useClass: VideoCountDayAdapter },
  { provide: WEEKLY_VIEWS_REPOSITORY_DI_TOKEN, useClass: WeeklyHitsRepository },
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN,
    useClass: WeeklyHitsV1Repository,
  },

  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
];
const adapters: Provider[] = [
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
  {
    provide: VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryListAdapter,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryByIdAdapter,
  },
];

@Module({
  imports: [CqrsModule, WeeklyHitsEntityModule, RelatedWordsModule],
  controllers,
  providers: [
    ...commands,
    ...queries,
    ...repositories,
    ...service,
    ...adapters,
  ],
})
export class HitsV1Module {}
