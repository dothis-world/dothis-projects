import { Inject, Injectable } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import {
  IRecentVideoHistoryOutboundPort,
  VideoHistoryAdapterResult,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { RecentVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';

/**
 * 각각의 단어 별로 관련된 최신의 히스토리를 불러옴
 */
@Injectable()
export class VideoHistoryRecentOsAdapter
  implements IRecentVideoHistoryOutboundPort
{
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }

  async execute(
    dao: RecentVideoHistoryDao,
  ): Promise<VideoHistoryAdapterResult> {
    // 기본 must 조건 설정
    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
    ];

    // dao.relatedWord가 있는 경우 추가
    if (dao.relatedWord) {
      mustQueries.push({
        match: {
          use_text: dao.relatedWord,
        },
      });
    }

    try {
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );
      const { body } = await this.opensearchClient.search({
        index, // 데이터 스트림 이름을 사용
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
        },
        _source: [
          'video_id',
          'video_views',
          'channel_average_views',
          'video_performance',
        ],
        size: 10000,
      });

      return Ok({
        total: body.hits.total,
        items: body.hits.hits.map((hit) => hit._source),
      });
    } catch (error) {
      console.error('Error fetching video history:', error);
      return Err(error);
    }
  }
}
