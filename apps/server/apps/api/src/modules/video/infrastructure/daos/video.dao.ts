import { FindAccumulateQuery } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { FindAdsInfoDto } from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { FindAdsTopHitsDto } from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
export class GetVideoDao extends GetVideoPaginatedPageDto {
  constructor(props: GetVideoDao) {
    super(props);
    this.clusterNumber = props.clusterNumber;
  }
}
export class FindDailyViewsV3Dao extends FindDailyViewsV3Dto {
  constructor(props: FindDailyViewsV3Dao) {
    super(props);
    Object.assign(this, props);
  }
}

export class FindIndividualVideoInfoV1Dao extends FindIndividualVideoInfoV1Dto {
  constructor(props: FindIndividualVideoInfoV1Dto) {
    super(props);
    Object.assign(this, props);
  }
}

export type GetRelatedVideoHistory = GetRelatedVideoAndVideoHistory;
interface IRelated {
  readonly relatedWord: string;
  readonly relatedCluster: string[];
}

export class GetRelatedLastVideoAndVideoHistoryEach
  extends GetRankingRelatedWordsDto
  implements IRelated
{
  public readonly relatedWord: string;
  public readonly relatedCluster: string[];
  constructor(props: GetRelatedLastVideoAndVideoHistoryEach) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetRelatedLastVideoAndVideoHistory extends GetRankingRelatedWordsDto {
  public readonly relatedWords: string[];
  public readonly relatedCluster: string[];
  constructor(props: GetRelatedLastVideoAndVideoHistory) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetRelatedVideoChannelHistoryDao
  extends ExpectedViewsV1Dto
  implements Pick<IRelated, 'relatedCluster'>
{
  public readonly relatedCluster: string[];
  constructor(props: ExpectedViewsV1Dto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.search = props.search;
    this.related = props.related;
    this.from = props.from;
    this.to = props.to;
    this.relatedCluster = propsClusterNumber;
  }
}
export class GetAdsInfoResDao extends FindAdsInfoDto {
  public readonly relatedCluster: string[];

  constructor(props: FindAdsInfoDto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? props.clusterNumber.split(',')
      : props.clusterNumber;
    this.relatedCluster = propsClusterNumber;
  }
}
export class GetVideoAdsTopHitsDao extends FindAdsTopHitsDto {
  public readonly relatedCluster: string[];

  constructor(props: FindAdsTopHitsDto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.relatedCluster = propsClusterNumber;
  }
}
export class GetVideoAndChannelViewsByDateAndKeywordsDao extends GetVideoAdsTopHitsDao {
  constructor(props: GetVideoAndChannelViewsByDateAndKeywordsDao) {
    super(props);
  }
}
