import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  CHANNEL_DATA_KEY,
  ExpectedViewsV2Query,
} from '@Apps/modules/channel_history/application/dtos/expected-views.dtos';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/repository/database/channel-history.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { TExpectedViewsArr } from '@dothis/dto';

@QueryHandler(ExpectedViewsV2Query)
export class ExpectedViewsV2QueryHandler
  implements
    IQueryHandler<
      ExpectedViewsV2Query,
      Result<
        TExpectedViewsArr,
        VideoNotFoundError | ChannelNotFoundError | ScrollApiError
      >
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  /**
   * 1. video를 다 찾음
   * 2. 선별된 video_id로 video 히스토리를 찾음
   * 3. 채널 히스토리도 찾음
   * 4. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
   * 5. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   * @param query
   */
  async execute(
    query: ExpectedViewsV2Query,
  ): Promise<
    Result<
      TExpectedViewsArr,
      VideoNotFoundError | ChannelNotFoundError | ScrollApiError
    >
  > {
    const arg = {
      ...query,
      data: [CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS],
    };
    /**
     * 비디오의 조회수를 알기 위해 비디오 히스토리를 가져옴
     */
    // const channelHistory =
    //   await this.channelHistory.findChannelHistoryByKeywordAndRelWordFullScan<IChannelHistory>(
    //     arg,
    //   );
    // if (channelHistory instanceof ScrollApiError)
    //   return Err(new ScrollApiError());
    // if (!channelHistory.length) return Err(new ChannelNotFoundError());
    //
    // const dailyPerformance =
    //   this.channelHistoryAggregateService.calculateDailyPerformance(
    //     channelHistory,
    //   );

    // const result =
    //   this.channelHistoryAggregateService.calculateKeywordPerformance(
    //     dailyPerformance,
    //   );

    return Ok([]);
  }
}
