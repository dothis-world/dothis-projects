import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { TExpectedViewsArr } from '@dothis/dto';
import { EXPECTED_HITS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { ExpectedHitsInboundPort } from '@Apps/modules/hits/domain/ports/expected-hits.inbound.port';
export type TExpectedViewsV1QueryHandlerRes = Result<
  TExpectedViewsArr,
  VideoNotFoundError | ChannelNotFoundError | ScrollApiError
>;
@QueryHandler(ExpectedViewsV1Dto)
export class ExpectedViewsV1QueryHandler
  implements IQueryHandler<ExpectedViewsV1Dto, TExpectedViewsV1QueryHandlerRes>
{
  constructor(
    @Inject(EXPECTED_HITS_SERVICE_DI_TOKEN)
    private readonly expectedHitsService: ExpectedHitsInboundPort,
  ) {}

  async execute(
    dto: ExpectedViewsV1Dto,
  ): Promise<TExpectedViewsV1QueryHandlerRes> {
    return await this.expectedHitsService.execute(dto);
  }
}
