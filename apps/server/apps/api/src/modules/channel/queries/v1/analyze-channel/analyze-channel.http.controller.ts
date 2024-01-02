import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard, TDecodePayload, User } from '@Libs/commons/src';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { AnalyzeChannelDto } from '@Apps/modules/channel/interface/analyze-channel.interface';
import { IRes } from '@Libs/commons/src/types/res.types';
import { match } from 'oxide.ts';
import { ChannelAnalysisRes } from '@Libs/commons/src/types/dto.types';

const { analyzeChannel } = nestControllerContract(apiRouter.channel);

const { summary, description } = analyzeChannel;
@ApiTags('채널')
@Controller()
export class AnalyzeChannelHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @UseGuards(JwtAccessGuard)
  @TsRest(analyzeChannel)
  @ApiBearerAuth('Authorization')
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: ChannelNotFoundError.message,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiOperation({
    summary,
    description,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiOkResponse({ type: ChannelAnalysisRes })
  async execute(
    @User() user: TDecodePayload,
  ): Promise<IRes<ChannelAnalysisRes>> {
    const arg = new AnalyzeChannelDto({ channelId: user.channelId });

    const result = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}