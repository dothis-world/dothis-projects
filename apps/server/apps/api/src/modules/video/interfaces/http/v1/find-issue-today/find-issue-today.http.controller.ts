import { Controller, NotFoundException } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { FinishedIssueTodayDto } from '@Apps/modules/video/application/dtos/find-issue-today.dto';
import { match } from 'oxide.ts';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { IRes, TTsRestRes } from '@Libs/types';
import {
  ITodayIssue,
  TodayIssueVideo,
} from '@Apps/modules/video/application/dtos/video.res';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { apiRouter } from '@dothis/dto';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
const c = nestControllerContract(apiRouter.video);
const getIssueToday = c.getIssueToday;
const { summary, description } = getIssueToday;
@ApiTags('영상')
@Controller()
export class FindIssueTodayHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getIssueToday)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: TodayIssueVideo })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute() {
    return tsRestHandler(getIssueToday, async () => {
      const arg = new FinishedIssueTodayDto();
      const result: TIssueTodayRes = await this.queryBus.execute(arg);
      return match<TIssueTodayRes, TTsRestRes<IRes<ITodayIssue[]>>>(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err: Error) => {
          if (err instanceof VideoNotFoundError)
            throw new NotFoundException(err.message);
          if (err instanceof TableNotFoundException)
            throw new InternalServerErrorException(err.message);
          throw err;
        },
      });
    });
  }
}
