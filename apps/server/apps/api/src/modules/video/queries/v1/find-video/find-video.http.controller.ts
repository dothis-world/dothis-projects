import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';
import { VideoRes } from '@Libs/commons/src/types/dto.types';
const c = nestControllerContract(apiRouter.video);
const { pathParams, summary, responses, description } = c.getVideo;

@ApiTags('영상')
@Controller()
export class FindVideoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 입력 : 탐색어only, 탐색어+연관어
   * 검색 : video type, 제목+태그에서 입력키워드 검색
   * 출력 : video 튜플
   */
  @TsRest(c.getVideo)
  @Get()
  @ApiQuery({
    name: 'search',
    required: true,
    description: '탐색어',
    example: '한소희',
  })
  @ApiQuery({
    name: 'related',
    required: false,
    description: '연관어',
    example: '영화',
  })
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse()
  async execute(
    @Query('search') search: string,
    @Query('related') related: string,
  ): Promise<IfindManyVideoResult[]> {
    const query = new FindVideoQuery({ search, related });
    return await this.queryBus.execute(query);
  }
}
