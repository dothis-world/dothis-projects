import {
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;

export type TRelatedVideoAndHistoryRes = Result<
  GetRelatedVideoHistory[],
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
export type TRelatedVideos = Result<
  IVideoSchema[],
  VideoNotFoundError | VideoHistoryNotFoundError
>;
export interface VideoOutboundPort {
  getRelatedVideoAndVideoHistory(
    props: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;

  getRelatedVideos(props: SearchRelationVideoDao): Promise<TRelatedVideos>;
}
