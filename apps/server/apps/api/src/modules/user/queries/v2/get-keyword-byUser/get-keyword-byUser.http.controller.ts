import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindKeywordTagByUserCommand } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { match, Result } from 'oxide.ts';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { ChannelKeywordOrtagDtos } from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
import { IRes } from '@Libs/commons/src/types/res.types';
const c = nestControllerContract(apiRouter.user);
const { summary, responses, description } = c.getUserKeyword;

@ApiTags('유저 관련')
@Controller()
export class GetKeywordByUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.getUserKeyword)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: '유저의 태그나 키워드를 찾아 옵니다.',
    type: ChannelKeywordOrtagDtos,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[404],
  })
  @ApiUnauthorizedResponse({ description: 'Authentication failed' })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  @ApiBearerAuth('Authorization')
  async getKeywordTag(
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes<ChannelKeywordOrtagDtos>> {
    const command = new FindKeywordTagByUserCommand({
      userId: userInfo.id.toString(),
      channelId: userInfo.channelId,
    });
    const result: Result<ChannelKeywordOrtagDtos, NotFoundException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof UserNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
