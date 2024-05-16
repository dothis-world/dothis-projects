import {
  IGetRelatedVideosPaginatedOutBoundPort,
  TRelatedVideos,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import {
  DateFormatter,
  IgniteResultToObjectMapper,
} from '@Apps/common/ignite/mapper';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Injectable } from '@nestjs/common';

/**
 * 대량의 비디오를 페이지네이션 방식으로 리턴합니다.
 * 조건:
 *  - video_published 3개월내 이상
 */
@Injectable()
export class VideoPaginatedAdapter
  extends VideoBaseAdapter
  implements IGetRelatedVideosPaginatedOutBoundPort
{
  /**
   * 주어진 조건으로 쿼리 문자열을 생성하는 메소드
   *
   * @param clusterNumbers - 클러스터 번호 배열
   * @param search - 검색어
   * @param related - 관련 검색어
   * @param from - 시작 날짜
   * @param to - 종료 날짜
   * @returns 쿼리 문자열
   */
  private queryString(
    clusterNumbers: string[],
    search: string,
    from: string,
    to: string,
    related?: string,
  ): string {
    let relatedCondition = '';
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    if (related) {
      relatedCondition = `AND (
        vd.video_title LIKE '%${related}%'
        OR vd.video_tags LIKE '%${related}%'
      )`;
    }
    const queryParts = clusterNumbers.map((cluster) => {
      const tableName = CacheNameMapper.getVideoDataCacheName(cluster);
      const joinTableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        fromDate.year,
        fromDate.month,
      );
      const joinSecTableName = CacheNameMapper.getChannelDataCacheName();

      if (fromDate.year === toDate.year && fromDate.month === toDate.month) {
        return `SELECT DISTINCT ${
          this.videoColumns.map((column) => ` vd.${column}`) +
          `, ch.channel_name, TO_CHAR(VIDEO_PUBLISHED, 'YYYY-MM-DD HH:MM:SS') as VIDEO_PUBLISHED`
        } FROM ${tableName} vd 
                JOIN ${joinTableName} vh 
                ON vd.video_id = vh.video_id 
                JOIN ${joinSecTableName} ch
                ON vd.channel_id = ch.channel_id
          WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%') 
          ${relatedCondition} 
          AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})
          AND VD.video_published >= DATEADD(month, -3, CURRENT_TIMESTAMP)`;
      }
      const joinThirdTableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        toDate.year,
        toDate.month,
      );
      return `SELECT DISTINCT ${
        this.videoColumns.map((column) => `vd.${column}`) + ', ch.channel_name'
      }
      FROM
        ${tableName} vd
      JOIN ${joinTableName} vh1 ON vd.VIDEO_ID = vh1.VIDEO_ID
      JOIN ${joinThirdTableName} vh2 ON vd.VIDEO_ID = vh2.VIDEO_ID
      JOIN ${joinSecTableName} ch
                ON vd.channel_id = ch.channel_id
      WHERE (vd.VIDEO_TITLE LIKE '%${search}%' OR vd.VIDEO_TAGS LIKE '%${search}%')
        ${relatedCondition}
        AND vh2.DAY <= ${toDate.day} 
        AND vh1.DAY >= ${fromDate.day}
        AND VD.video_published >= DATEADD(month, -3, CURRENT_TIMESTAMP)
      `;
    });

    return queryParts.length > 1 ? queryParts.join(' UNION ') : queryParts[0];
  }
  constructor(private readonly igniteService: IgniteService) {
    super();
  }
  async execute(dao: GetVideoDao): Promise<TRelatedVideos> {
    const { search, related, from, to, clusterNumber, limit, page } = dao;

    const queryString = this.queryString(
      clusterNumber,
      search,
      from,
      to,
      related,
    );

    const tableName = CacheNameMapper.getVideoDataCacheName(clusterNumber[0]);
    const pageSize = Number(limit);
    const currentPage = Number(page);
    try {
      const query = this.igniteService.createDistributedJoinQuery(
        '(' +
          queryString +
          `) LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize}`,
      );

      const cache = await this.igniteService.getClient().getCache(tableName);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
