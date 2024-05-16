import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetRelatedVideosCountByDayOutBoundPort,
  TRelatedVideosCountByDay,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { CountByDayRes } from '@Apps/modules/video/infrastructure/daos/video.res';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';

/**
 * 비디오 총갯수를 받아오는 어뎁터
 * 조건:
 *  - video_published 3개월내 이상
 */
@Injectable()
export class VideoCountDayAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideosCountByDayOutBoundPort
{
  constructor(private readonly igniteService: IgniteService) {
    super();
  }

  async execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideosCountByDay> {
    const { search, related, from, to, relatedCluster } = dao;

    try {
      const fromDate = DateFormatter.getFormattedDate(from);
      const tableName = CacheNameMapper.getVideoHistoryCacheName(
        relatedCluster[0],
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      const cache = await this.igniteService.getClient().getCache(tableName);
      const clusterQueryString = this.getClusterQueryString(
        ['vh.DAY', 'COUNT(DISTINCT vh.VIDEO_ID) AS unique_video_count'],
        search,
        from,
        to,
        relatedCluster,
        related,
        'vh.DAY',
      );

      const query =
        this.igniteService.createDistributedJoinQuery(clusterQueryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();

      if (!resArr.length) return Err(new VideoHistoryNotFoundError());
      const resultLast = IgniteResultToObjectMapper.mapResultToObjects(
        resArr,
        clusterQueryString,
      );
      const sumResult: CountByDayRes[] = Object.values(
        resultLast.reduce((acc, curr) => {
          if (!acc[curr.day]) {
            acc[curr.day] = { day: curr.day, uniqueVideoCount: 0 };
          }
          acc[curr.day].uniqueVideoCount += curr.uniqueVideoCount;
          return acc;
        }, {}),
      );
      return Ok(sumResult);
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
