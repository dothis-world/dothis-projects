import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { IGetVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
export interface GetRelatedVideoAndVideoHistory {
  videoId: string;
  videoViews: number;
  videoLikes: number;
  videoComments: number;
  videoPerformance: number;
  year: number;
  month: number;
  day: number;
}
export type TGetVideoHistoryRes = Result<
  GetRelatedVideoAndVideoHistory[],
  VideoHistoryNotFoundError | TableNotFoundException
>;

export interface IRelatedVideoAnalyticsData
  extends Pick<
    GetRelatedVideoAndVideoHistory,
    'videoId' | 'videoViews' | 'day'
  > {
  channelAverageViews: number;
  channelId: string;
  videoTitle: string;
  videoTags: string;
}

export interface VideoHistoryOutboundPort {
  getHistory(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetRelatedVideoAndVideoHistoryRes
  extends Pick<
    GetRelatedVideoAndVideoHistory,
    'videoId' | 'videoViews' | 'day'
  > {}
