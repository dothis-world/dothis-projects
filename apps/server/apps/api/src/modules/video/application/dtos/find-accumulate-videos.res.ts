import { IChannelHistoryRes } from '@Apps/modules/channel-history/application/dtos/expected-views.res';
import { IVideoHistorySource } from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';

export interface FindAccumulateVideosRes
  extends Pick<IChannelHistoryRes, 'channel_id' | 'channel_subscribers'> {}

export interface FindAccumulateVideosV2Res extends IVideoHistorySource {}
