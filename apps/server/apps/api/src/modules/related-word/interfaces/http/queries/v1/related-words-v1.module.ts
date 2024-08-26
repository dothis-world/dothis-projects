import { Module, Provider } from '@nestjs/common';
import {
  CACHE_FIND_ALL_QUERY,
  CACHE_SET_DIC_TERM,
  GET_SEARCH_WORD_DI_TOKEN,
  KOREAN_AUTO_COMPLETE_DI_TOKEN,
  RELWORDS_DI_TOKEN,
} from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelatedWordsQueryHandler } from '@Apps/modules/related-word/application/queries/find-related-words.query-handler';
import { UpdateAutoCompleteWordsHttpController } from '@Apps/modules/related-word/interfaces/http/command/v1/update-auto-complete-words/update-auto-complete-words.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/related-word/interfaces/http/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { FindRelCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/find-rel.cache';
import { GetRankingRelatedWordsHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/ranking-related-words/get-ranking-related-words.http.controller';
import { GetRankingRelatedWordsService } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { FindSearchKeywordHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { FindSearchKeywordQueryHandler } from '@Apps/modules/related-word/application/queries/find-search-keyword.query-handler';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { FindDicTermImplement } from '@Apps/modules/related-word/infrastructure/adapters/find-dic-term.implement';
import { SetDicTermImplement } from '@Apps/modules/related-word/infrastructure/adapters/set-dic-term.implement';
import {
  CHANNEL_DATA_REPOSITORY,
  CHANNEL_TERM,
} from '@Apps/modules/channel/channel-data.di-token.constants';
import { GetDicSearchTermCommandHandler } from '@Apps/modules/related-word/application/service/get-dic-search-term.service';
import { FindSearchTermService } from '@Apps/modules/related-word/application/service/find-search-term.service';
import { SetDicTermHandler } from '@Apps/modules/related-word/application/service/set-search-term.service';
import { ChannelEntityModule } from '@Apps/modules/channel/infrastucture/entities/channel.entity.module';
import { DeleteRelWordsHttpController } from '@Apps/modules/related-word/interfaces/http/command/v1/delete-rel-words/delete-rel-words.http.controller';
import { DeleteRelWordsCommandHandler } from '../../command/v1/delete-rel-words/delete-rel-words.command-handler';
import { DeleteKeyWordHttpController } from '@Apps/modules/related-word/interfaces/http/command/v1/delete-keyword/delete-keyword.http.controller';
import { DeleteKeyWordCommandHandler } from '@Apps/modules/related-word/application/command/delete-keyword.command-handler';
import { GetPageByKeywordHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/get-page-by-keyword/get-page-by-keyword.http.controller';
import { GetPageByKeywordQueryHandler } from '@Apps/modules/related-word/application/queries/get-page-by-keyword.query-handler';
import { GetPageByKeywordService } from '@Apps/modules/related-word/application/service/get-page-by-keyword.service';
import {
  GET_KEYWORD_INFO_SERVICE,
  GET_PAGE_BY_KEYWORD_SERVICE,
} from '@Apps/modules/related-word/keyword.di-token.constant';
import { GetKeywordInformationHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/get-keyword-information/get-keyword-information.http.controller';
import { GetKeywordInformationService } from '@Apps/modules/related-word/application/service/get-keyword-information.service';
import { GetKeywordInformationQueryHandler } from '@Apps/modules/related-word/application/queries/get-keyword-information.query-handler';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { SearchTermCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/search-term.cache';
import { KoreanAutocompleteCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache';
import { VideoHistoryOsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.os.adapter';
import { VideoMultiRelatedWordsCacheAdapter } from '@Apps/modules/video/infrastructure/adapters';
import { VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { MockGetChannelDataAdapter } from '@Apps/modules/channel/infrastucture/adapters/__mock__/get-channel-data.adapter.mock';

const controllers = [
  UpdateAutoCompleteWordsHttpController,
  GetRankingRelatedWordsHttpController,
  FindSearchKeywordHttpController,
  DeleteRelWordsHttpController,
  DeleteKeyWordHttpController,
  GetPageByKeywordHttpController,
  GetKeywordInformationHttpController,
];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  {
    provide: VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
    useClass: VideoMultiRelatedWordsCacheAdapter,
  },
  {
    provide: CACHE_FIND_ALL_QUERY,
    useClass: FindDicTermImplement,
  },
  {
    provide: CACHE_SET_DIC_TERM,
    useClass: SetDicTermImplement,
  },
  {
    provide: CHANNEL_TERM,
    useClass: GetDicSearchTermCommandHandler,
  },
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
  {
    provide: KOREAN_AUTO_COMPLETE_DI_TOKEN,
    useClass: KoreanAutocompleteCache,
  },
  SetDicTermHandler,
  FindSearchTermService,
  RankingRelatedWordAggregateService,
  VideoHistoryOsAdapter,
  { provide: CHANNEL_DATA_REPOSITORY, useClass: MockGetChannelDataAdapter },
];

const handler = [
  GetPageByKeywordQueryHandler,
  FindRelatedWordsQueryHandler,
  UpdateAutoCompleteWordsCommandHandler,
  GetRankingRelatedWordsService,
  FindSearchKeywordQueryHandler,
  DeleteRelWordsCommandHandler,
  DeleteKeyWordCommandHandler,
  GetKeywordInformationQueryHandler,
];

const service: Provider[] = [
  { provide: GET_PAGE_BY_KEYWORD_SERVICE, useClass: GetPageByKeywordService },
  { provide: GET_KEYWORD_INFO_SERVICE, useClass: GetKeywordInformationService },
  { provide: GET_SEARCH_WORD_DI_TOKEN, useClass: SearchTermCache },
];
@Module({
  imports: [
    CqrsModule,
    OpensearchCoreModule,
    RelatedWordsModule,
    ChannelHistoryServiceModule,
    ChannelEntityModule,
    WeeklyHitsEntityModule,
  ],
  controllers,
  providers: [...repositories, ...service, ...handler],
})
export class RelatedWordsV1Module {}