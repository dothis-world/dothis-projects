import {
  RelatedVideoAndCountByDayDao,
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
import {
  GetRelatedLastVideoAndVideoHistory,
  GetRelatedLastVideoAndVideoHistoryEach,
  GetRelatedVideoChannelHistoryDao,
  GetRelatedVideoHistory,
  GetVideoDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  CountByDayRes,
  IVideoSchema,
} from '@Apps/modules/video/infrastructure/daos/video.res';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { TGetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/adapters/video.last-history.adapter';
import {
  TGetRelatedVideoChannelHistoryRes,
  VideoChannelHistoryAdapter,
} from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;

export type TRelatedVideoAndHistoryRes = Result<
  GetRelatedVideoHistory[],
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
export type TRelatedVideos = Result<
  IVideoSchema[],
  VideoNotFoundError | VideoHistoryNotFoundError | TableNotFoundException
>;
export type TRelatedEntireCount = Result<
  number[][],
  VideoNotFoundError | TableNotFoundException
>;

export type TGetVideoWithChannelInfo = Result<
  IVideoSchema,
  VideoNotFoundError | TableNotFoundException
>;
export type TRelatedVideosCountByDay = Result<CountByDayRes[], any>;
export interface IGetRelatedVideoOutboundPort {
  execute(props: SearchRelationVideoDao): Promise<TRelatedVideos>;
}
export interface IGetRelatedVideoAndVideoHistoryOutBoundPort {
  execute(
    props: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;
}
export interface IGetRelatedVideosCountByDayOutBoundPort {
  execute(dao: RelatedVideoAndCountByDayDao): Promise<TRelatedVideosCountByDay>;
}
export interface IGetRelatedVideosPaginatedOutBoundPort {
  execute(dao: GetVideoDao): Promise<TRelatedVideos>;
}
export interface IGetRelatedVideosEntireCountOutBoundPort {
  execute(dao: GetVideoDao): Promise<TRelatedEntireCount>;
}

export interface IGetRelatedLastVideoHistoryEach {
  execute(
    dao: GetRelatedLastVideoAndVideoHistoryEach,
  ): Promise<TGetRelatedLastVideoAndVideoHistory>;
}
export interface IGetRelatedLastVideoHistory {
  execute(
    dao: GetRelatedLastVideoAndVideoHistory,
  ): Promise<TGetRelatedLastVideoAndVideoHistory>;
}
export interface IGetRelatedVideoChannelHistoryOutboundPort {
  execute(
    dao: GetRelatedVideoChannelHistoryDao,
  ): Promise<TGetRelatedVideoChannelHistoryRes>;
}
