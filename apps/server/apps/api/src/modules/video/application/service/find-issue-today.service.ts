import { FindIssueTodayInboundPort } from '@Apps/modules/video/domain/ports/find-issue-today.inbound.port';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { GetWeeklyKeyword } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import {
  TopVideoAdapterResult,
  TopVideoOutboundPort,
} from '@Apps/modules/video/domain/ports/top-video.outbound.port';
import { TOP_VIDEO_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { TopVideoDao } from '@Apps/modules/video/infrastructure/daos/top-video.dao';
import dayjs from 'dayjs';
interface ITopVideoResponse extends TopVideoAdapterResult {
  search: string;
}
export class FindIssueTodayService implements FindIssueTodayInboundPort {
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly weeklyKeywordRepository: WeeklyHitsV2OutboundPort,

    @Inject(TOP_VIDEO_ADAPTER_DI_TOKEN)
    private readonly topVideoAdapter: TopVideoOutboundPort,
  ) {}

  async execute(): Promise<TIssueTodayRes> {
    const current = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    try {
      const dao = new GetWeeklyKeyword({ limit: '5' });
      const topThree = await this.weeklyKeywordRepository.getWeeklyKeywords(
        dao,
      );
      if (topThree.isOk()) {
        const topThreeUnwrap = topThree.unwrap();

        const videoMultiKeywordCacheRes: TopVideoDao[] = topThreeUnwrap.map(
          (item) => {
            /**
             * 영상이 제한적이여서 탐색어로만 찾음
             */
            return new TopVideoDao(
              item.recommendedKeyword,
              undefined,
              current,
              current,
            );
          },
        );

        const seenVideoIds = new Set<string>(); // 중복된 video_id를 추적할 집합
        const topVideoResults: ITopVideoResponse[] = await Promise.all(
          videoMultiKeywordCacheRes.map(async (videoDao) => {
            const result = await this.topVideoAdapter.execute(videoDao);
            const items = result.isOk() ? result.unwrap().items : [];

            // 중복되지 않은 첫 번째 비디오 찾기
            const nonDuplicateItem = items.find(
              (item) => !seenVideoIds.has(item.video_id),
            );
            if (nonDuplicateItem) {
              seenVideoIds.add(nonDuplicateItem.video_id); // 처리된 video_id를 기록

              return {
                search: videoDao.search,
                ...nonDuplicateItem,
              } as ITopVideoResponse;
            }
            return null; // 모든 항목이 중복된 경우
          }),
        );

        const validResults = topVideoResults
          .filter((res) => res && res.video_id) // 필터 확인용 및 누락 처리
          .map((res) => {
            return {
              search: res.search,
              videoId: res.video_id,
              videoTitle: res.video_title,
              channelName: res.channel_name,
              videoViews: res.video_views,
              videoPublished: res.video_published,
            };
          });

        return Ok(validResults);
      }
      return Err(topThree.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
