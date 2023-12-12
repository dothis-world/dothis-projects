import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IRes } from '@Libs/commons/src/types/res.types';
import {
  FindVideoPageQuery,
  IFindVideoPageQuery,
} from './find-video-paging.req.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IPagingRes } from '@Apps/modules/video/interface/find-many-video.interface';
import { VideoRes } from '@Libs/commons/src/types/dto.types';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getVideo;

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 연관콘텐츠 영상 api
   * 입력 : 탐색어, 연관어
   * - perfomence field 기준 정렬
   * - 영상 50개까지 큐레이팅
   * - 페이지 당 5개씩 페이지네이션
   * 출력 : video_id[50] (list)
   *
   * 하단부 연관 콘텐츠 부분 유튜브 영상 나열하는데 사용
   */
  @ApiQuery({
    name: 'search',
    required: true,
    description: '탐색어',
    example: '고기',
  })
  @ApiQuery({
    name: 'related',
    required: false,
    description: '연관어',
    example: '돼지고기',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '페이지당 갯수',
    example: '5',
  })
  @ApiQuery({
    name: 'last',
    required: false,
    description: '전 페이지 마지막 인덱스 _id',
  })
  @ApiParam({
    name: 'clusterNumber',
    required: true,
    description: '클러스터 인덱스',
    example: '6',
  })
  @ApiOperation({
    summary,
    description:
      description +
      ' channel_name 추가,현재 채널 타이틀 데이터가 완전치 않아 없으면 객체도 없음',
  })
  @TsRest(c.getVideo)
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: IFindVideoPageQuery,
  ): Promise<IRes<IPagingRes>> {
    const { limit, search, related, last } = query;
    const arg = new FindVideoPageQuery({
      clusterNumber: Number(clusterNumber),
      limit,
      search,
      related,
      last,
    });
    const result: Result<IPagingRes, VideoNotFoundError> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof VideoNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}
