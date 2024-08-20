import { Module, Provider } from '@nestjs/common';
import {
  RedisCacheAdapterTokens,
  VIDEO_ADS_INFO_IGNITE_DI_TOKEN,
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
  VIDEO_GET_ADS_INFO_DI_TOKEN,
  VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN,
  VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN,
  VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
  VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { FindIndividualVideoInfoService } from '@Apps/modules/video/application/service/find-individual-video-info.service';

import {
  VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_GET_LAST_HISTORY_HIT_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_IGNITE_DI_TOKEN,
} from '@Apps/modules/video-history/video_history.di-token';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';
import { VideoEntireCountAdapter } from '@Apps/modules/video/infrastructure/adapters/video.entire-count.adapter';
import { VideoHistoryGetListByIdsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.get-list-by-ids.adapter';
import { FindAccumulateVideosV1HttpController } from '@Apps/modules/video/interfaces/http/v1/find-accumulate-videos/find-accumulate-videos.http.controller';
import { FindAccumulateVideoService } from '@Apps/modules/video/application/service/find-accumulate-video.service';
import { FindAccumulateVideosV1QueryHandler } from '@Apps/modules/video/application/queries/v1/find-accumulate-videos.query-handler';
import { VideoHistoryLastOneAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.last-one.adapter';
import { VideoHistoryGetMultipleByIdAdapter } from '@Apps/modules/video-history/infrastructure/adapters';
import { FindAdsInfoService } from '@Apps/modules/video/application/service/find-ads-info.service';
import { FindAdsInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-ads-info/find-ads-info.http.controller';
import { FindAdsInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { FindAdsTopHitsQueryHandler } from '@Apps/modules/video/application/queries/v1/find-ads-top-hits.query-handler';
import { FindAdsTopHitsService } from '@Apps/modules/video/application/service/find-ads-top-hits.service';
import { FindAdsTopHitsHttpController } from '@Apps/modules/video/interfaces/http/v1/find-ads-top-hits/find-ads-top-hits.http.controller';
import { FindPerformanceLengthHttpController } from '@Apps/modules/video/interfaces/http/v1/find-performance-length/find-performance-length.http.controller';
import { FindPerformanceLengthService } from '@Apps/modules/video/application/service/find-performance-length.service';
import {
  VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { FindPerformanceLengthQueryHandler } from '@Apps/modules/video/application/queries/v1/find-performance-length.query-handler';
import { VideoCacheAdapter } from '@Apps/modules/video/infrastructure/adapters';
import { FindIssueTodayQueryHandler } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { FindIssueTodayService } from '@Apps/modules/video/application/service/find-issue-today.service';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { FindIssueTodayHttpController } from '@Apps/modules/video/interfaces/http/v1/find-issue-today/find-issue-today.http.controller';
import { VideoMultiKeywordCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.muti-keyword.cache.adapter';
import { VideoHistoryGetTopViewsByIdsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.get-top-views.by-ids.adapter';
import { GetVideoTodayIssueCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.get-today-issue.cache.adapter';
import { SetVideoTodayIssueCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.set-today-issue.cache.adapter';
import { MockGetVideoAdsInfoAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-video-ads-info.adapter.mock';
import {
  CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
} from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { MockGetChannelHistoryLastestAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-lastest.adapter.mock';
import { MockVideoHistory } from '@Apps/modules/video-history/infrastructure/adapters/__mock__/video-history.mock';
import { MockGetRelatedVideo } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-related-video.mock';
import { MockGetChannelHistoryByIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-by-id.adapter.mock';
import { MockGetTopHitsVideoAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-top-hits-video.adapter.mock';
import { MockGetUnknownAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-unknown.adapter.mock';

const controllers = [
  FindIndividualVideoInfoHttpController,
  FindAccumulateVideosV1HttpController,
  FindAdsInfoHttpController,
  FindAdsTopHitsHttpController,
  FindPerformanceLengthHttpController,
  FindIssueTodayHttpController,
];

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  FindAccumulateVideosV1QueryHandler,
  FindIndividualVideoInfoQueryHandler,
  FindAdsInfoQueryHandler,
  FindAdsTopHitsQueryHandler,
  FindPerformanceLengthQueryHandler,
  FindIssueTodayQueryHandler,
];
const service: Provider[] = [
  { provide: VIDEO_ADS_INFO_IGNITE_DI_TOKEN, useClass: FindAdsInfoService },
  {
    provide: VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
    useClass: FindIndividualVideoInfoService,
  },
  {
    provide: VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
    useClass: FindAccumulateVideoService,
  },
  {
    provide: VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN,
    useClass: FindAdsTopHitsService,
  },
  {
    provide: VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN,
    useClass: FindPerformanceLengthService,
  },
  {
    provide: VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN,
    useClass: FindIssueTodayService,
  },
];

const adapters: Provider[] = [
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
  {
    provide: VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetMultipleByIdAdapter,
  },
  {
    provide: VIDEO_HISTORY_GET_LAST_HISTORY_HIT_IGNITE_DI_TOKEN,
    useClass: VideoHistoryLastOneAdapter,
  },
  { provide: VIDEO_COUNT_DAY_IGNITE_DI_TOKEN, useClass: VideoCountDayAdapter },
  {
    provide: VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
    useClass: VideoEntireCountAdapter,
  },
  {
    provide: VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetListByIdsAdapter,
  },
  {
    provide: VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN,
    useClass: VideoMultiKeywordCacheAdapter,
  },
  {
    provide: VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN,
    useClass: VideoHistoryGetTopViewsByIdsAdapter,
  },
  {
    provide: RedisCacheAdapterTokens.REDIS_CLIENT_SET_TODAY_ISSUE_DI_TOKEN,
    useClass: SetVideoTodayIssueCacheAdapter,
  },
  {
    provide: RedisCacheAdapterTokens.REDIS_CLIENT_GET_TODAY_ISSUE_DI_TOKEN,
    useClass: GetVideoTodayIssueCacheAdapter,
  },
  {
    provide: VIDEO_GET_ADS_INFO_DI_TOKEN,
    useClass: MockGetVideoAdsInfoAdapter,
  },
  {
    provide: CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryLastestAdapter,
  },
  {
    provide: VIDEO_HISTORY_IGNITE_DI_TOKEN,
    useClass: MockVideoHistory,
  },
  {
    provide: CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
    useClass: MockGetRelatedVideo,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryByIdAdapter,
  },
  {
    provide: VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN,
    useClass: MockGetTopHitsVideoAdapter,
  },
  {
    provide: VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
    useClass: MockGetUnknownAdapter,
  },
];

const repositories: Provider[] = [
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
];

@Module({
  imports: [
    CqrsModule,
    OpensearchCoreModule,
    ChannelHistoryServiceModule,
    WeeklyHitsEntityModule,
  ],
  controllers,
  providers: [
    ...repositories,
    ...queryHandlers,
    ...commandHandlers,
    VideoAggregateService,
    ...service,
    ...adapters,
  ],
})
export class VideoApiV1Module {}
