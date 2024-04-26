import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter, GetAdsRelatedTopHitsRes } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { ClusterNumberMulti } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  FindAdsTopHitsDto,
  FindAdsTopHitsQuery,
} from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';
import { match } from 'oxide.ts';
import { TFindAdsTopHits } from '@Apps/modules/video/application/queries/v1/find-ads-top-hits.query-handler';
import {
  FindAdsRelatedTopHitsRes,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getAdvertisingRelatedVideo;

@ApiTags('영상')
@Controller()
export class FindAdsTopHitsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary,
    description,
  })
  @TsRestHandler(c.getAdvertisingRelatedVideo)
  @ApiOkResponse({ type: FindAdsRelatedTopHitsRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '24, 33, 22, 23, 8',
  })
  async execute(
    @Param(ParseArrayPipe) param: IParamsInterface,
    @Query() query: FindAdsTopHitsQuery,
  ) {
    return tsRestHandler(
      c.getAdvertisingRelatedVideo,
      async ({ query, params }) => {
        const arg = new FindAdsTopHitsDto({
          clusterNumber: param.clusterNumber,
          ...query,
        });
        const result = await this.queryBus.execute(arg);
        return match<
          TFindAdsTopHits,
          TTsRestRes<IRes<GetAdsRelatedTopHitsRes[]>>
        >(result, {
          Ok: (result) => ({ status: 200, body: result }),
          Err: (err) => {
            if (err instanceof VideoNotFoundError)
              throw new NotFoundException(err.message);
            if (err instanceof TableNotFoundException)
              throw new InternalServerErrorException(err.message);
            throw err;
          },
        });
      },
    );
  }
}
