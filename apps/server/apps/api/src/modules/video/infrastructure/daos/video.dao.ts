import { FindAccumulateQuery } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  GetVideoPaginatedPageDto,
  IFindVideoPageQuery,
} from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
export class GetVideoDao extends GetVideoPaginatedPageDto {}
export class FindDailyViewsV3Dao extends FindDailyViewsV3Dto {
  constructor(props: FindDailyViewsV3Dao) {
    super(props);
    Object.assign(this, props);
  }
}
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

export type GetRelatedVideoHistory = {
  id: string;
  videoViews: number;
  year: number;
  month: number;
  day: number;
};
