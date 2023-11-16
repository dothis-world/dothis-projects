import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { FindVideoHistoryOsAdapter } from '@Apps/modules/video_history/interface/find-video-history.os.adapter';
import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IFindVideoIdRes } from '@Apps/modules/video/interface/find-video.os.res';

export interface IIncreaseData {
  date: string;
  increase_views: number;
  increase_likes: number;
  increase_comments: number;
}
@QueryHandler(FindDailyViewsQuery)
export class FindDailyViewsQueryOsHandler
  implements
    IQueryHandler<
      FindDailyViewsQuery,
      Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
    >
{
  constructor(
    @Inject(VIDEO_HISTORY_OS_DI_TOKEN)
    private readonly videoHistory: FindVideoHistoryOsAdapter,
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,
  ) {}

  async execute(
    query: FindDailyViewsQuery,
  ): Promise<
    Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
  > {
    const arg: FindVideoDateQuery = {
      ...query,
      data: [VIDEO_DATA_KEY.VIDEO_ID],
    };
    const videos =
      await this.video.findvideoIdfullScanAndVideos<IFindVideoIdRes>(arg);
    if (!videos) return Err(new VideoNotFoundError());
    const videoHistories =
      await this.videoHistory.findVideoHistoryFullScan<IFindVideoHistoryResponse>(
        videos.map((e) => e.video_id),
        query.from.toString(),
        query.to.toString(),
        query.clusterNumber,
      );
    if (!videoHistories) return Err(new VideoHistoryNotFoundError());
    return Ok(this.calculateIncrease(videoHistories));
  }

  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계
   * @param videoData
   * @private
   */
  private calculateIncrease(
    videoData: IFindVideoHistoryResponse[],
  ): IIncreaseData[] {
    // Sort the data by 'video_id' and 'crawled_date'
    videoData.sort(
      (a, b) =>
        a.video_id.localeCompare(b.video_id) ||
        a.crawled_date.localeCompare(b.crawled_date),
    );

    let result: IIncreaseData[] = [];

    let prevVideo = null;

    for (let i = 0; i < videoData.length; i++) {
      if (prevVideo && prevVideo.video_id === videoData[i].video_id) {
        const date = new Date(videoData[i].crawled_date)
          .toISOString()
          .split('T')[0]; // Extract only the date part

        const increaseViews = videoData[i].video_views - prevVideo.video_views;
        const increaseLikes = videoData[i].video_likes - prevVideo.video_likes;
        const increaseComments =
          videoData[i].video_comments - prevVideo.video_comments;

        if (!result[date]) {
          result[date] = {
            date,
            increase_views: 0,
            increase_likes: 0,
            increase_comments: 0,
          };
        }

        result[date].increase_views += increaseViews;
        result[date].increase_likes += increaseLikes;
        result[date].increase_comments += increaseComments;
      }

      prevVideo = { ...videoData[i] };
    }

    return Object.values(result);
  }
}
