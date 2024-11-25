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
import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, USER_AUTH, zOwnInfo, zVideoModel } from '@dothis/dto';
import { User } from '@Libs/commons';
import { QueryBus } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interfaces/get-own-info.interface';
import { User as UserEntity } from '@Apps/modules/user/domain/user.entity';
import { IRes, TDecodePayload } from '@Libs/types';
import { match, Result } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { JwtAccessGuard } from '@Libs/oauth';
const { getOwnInfo } = nestControllerContract(apiRouter.auth);
const { summary, description } = getOwnInfo;
export class OwnInfoRes extends createZodDto(extendApi(zOwnInfo)) {}
@ApiTags('유저 인증')
@Controller()
export class GetOwnInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getOwnInfo)
  @UseGuards(JwtAccessGuard)
  @ApiOkResponse({
    description: '유저의 정보를 찾아 옵니다.',
    type: OwnInfoRes,
  })
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserNotFoundError.message,
  })
  @ApiUnauthorizedResponse({
    description: `${USER_AUTH.AccessTokenExpired} or ${USER_AUTH.NoTokenProvided} 메세지가 뜹니다`,
  })
  @ApiBearerAuth('Authorization')
  async execute(@User() user: TDecodePayload): Promise<IRes<UserEntity>> {
    const query = new GetOwnInfoQuery({ index: user.id });

    const result: Result<UserEntity, NotFoundException> =
      await this.queryBus.execute(query);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (
          err instanceof UserNotFoundError ||
          err instanceof ChannelNotFoundError
        ) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
