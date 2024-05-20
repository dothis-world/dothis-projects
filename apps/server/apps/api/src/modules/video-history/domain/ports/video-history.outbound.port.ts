import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import {
  IGetLastVideoHistoryDao,
  IGetListVideoHistoryDao,
  IGetVideoHistoryDao,
  IGetVideoHistoryGetMultipleByIdDao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { DateData } from '@Apps/modules/video/infrastructure/daos/video.res';

export interface GetRelatedVideoAndVideoHistory extends DateData {
  videoId: string;
  videoViews: number;
  videoLikes: number;
  videoComments: number;
  videoPerformance: number;
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

export interface IGetOneVideoHistoryOutboundPort {
  execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetLastVideoHistoryOutboundPort {
  execute(dao: IGetLastVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetListVideoHistoryOutboundPort {
  execute(dao: IGetListVideoHistoryDao): Promise<TGetVideoHistoryRes>;
}
export interface IGetVideoHistoryGetMultipleByIdOutboundPort {
  execute(
    dao: IGetVideoHistoryGetMultipleByIdDao,
  ): Promise<TGetVideoHistoryRes>;
}
