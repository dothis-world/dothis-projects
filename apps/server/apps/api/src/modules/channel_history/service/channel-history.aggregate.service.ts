import {
  IChannelHistory,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { IExpectedData } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.http.controller';
import { IChannelHistoryWithoutChannelSubscribers } from '@Apps/modules/rel-words/interface/rank-rel.interface';

export class ChannelHistoryAggregateService {
  /**
   * 기획상 구독자 범위
   * @private
   */
  private readonly ranges = [
    //구독자 1000명 이하는 분석을 안해 구간을 사용하지 않음, 그러나 나중을 대비
    { gte: 0, lte: 99, max: 100, section: SECTION_NUMBER.RANGE_0_100 },
    { gte: 100, lte: 999, max: 1000, section: SECTION_NUMBER.RANGE_100_1000 },
    {
      gte: 1000,
      lte: 9999,
      max: 10000,
      section: SECTION_NUMBER.RANGE_1000_10000,
    },
    {
      gte: 10000,
      lte: 49999,
      max: 50000,
      section: SECTION_NUMBER.RANGE_10000_50000,
    },
    {
      gte: 50000,
      lte: 99999,
      max: 100000,
      section: SECTION_NUMBER.RANGE_50000_100000,
    },
    {
      gte: 100000,
      lte: 499999,
      max: 500000,
      section: SECTION_NUMBER.RANGE_100000_500000,
    },
    {
      gte: 500000,
      max: Infinity,
      section: SECTION_NUMBER.RANGE_500000_AND_ABOVE,
    },
  ];

  /**
   * 비디오 데이터와 채널 데이터를 받아 비디오 데이터 루프를 돌면서 채널데이터안의 구독자수 확인
   * 비디오가 속한 채널을 확인해 구독자 구간에 카운팅
   * @param ChannelHistoryData 채널 히스토리 데이터
   */
  countSubscribersByRange(ChannelHistoryData: IChannelHistory[]): ISection[] {
    const rangesWithCount = this.ranges.map((range) => ({
      ...range,
      number: 0,
    }));
    for (let item of ChannelHistoryData) {
      const subscribers = item._source.channel_subscribers;
      for (let range of rangesWithCount) {
        //구독자 1000명 이하는 분석을 안해 구간을 사용하지 않음, 그러나 나중을 대비
        if (rangesWithCount[1].lte > subscribers) break;
        if (subscribers >= range.gte && subscribers < range.lte) {
          range.number += item.inner_hits.video_list.hits.total.value;
          break;
        }
      }
    }
    return rangesWithCount;
  }
  /**
   *   1. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
   *   2. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   */
  /**
   * 평균 기대조회수 리턴
   * @param channelHistories
   * @private
   */
  calculateAverageViews(
    channelHistories:
      | IChannelHistory[]
      | IChannelHistoryWithoutChannelSubscribers[],
  ): IExpectedData[] {
    let dateViewRatios: { [date: string]: { total: number; count: number } } =
      {};
    for (let channel of channelHistories) {
      let channelAvgViews = channel._source.channel_average_views;
      let videoList = channel.inner_hits.video_list.hits.hits;
      for (let video of videoList) {
        let videoViews = video._source.video_views;
        if (channelAvgViews !== 0) {
          let viewsRatio = videoViews / channelAvgViews;
          let videoDate = new Date(video._source.crawled_date);
          let dateString = `${videoDate.getFullYear()}-${(
            videoDate.getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}-${videoDate
            .getDate()
            .toString()
            .padStart(2, '0')}`;

          if (!dateViewRatios[dateString]) {
            dateViewRatios[dateString] = { total: 0, count: 0 };
          }
          dateViewRatios[dateString].total += viewsRatio;
          dateViewRatios[dateString].count += 1;
        }
      }
    }

    let result: IExpectedData[] = [];
    for (let date in dateViewRatios) {
      let averageViewsRatio =
        dateViewRatios[date].total / dateViewRatios[date].count;
      result.push({ date: date, expected_views: averageViewsRatio });
    }
    return result;
  }
}
