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
import { apiRouter, USER_AUTH } from '@dothis/dto';
import { JwtAccessGuard, TDecodePayload, User } from '@Libs/commons/src';
import { QueryBus } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interfaces/get-own-info.interface';
import { User as UserEntity } from '@Apps/modules/user/domain/user.entity';
import { UserRes, IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { match, Result } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
const { getOwnInfo } = nestControllerContract(apiRouter.auth);
const { summary, description } = getOwnInfo;

@ApiTags('유저 인증')
@Controller()
export class GetOwnInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getOwnInfo)
  @UseGuards(JwtAccessGuard)
  @ApiOkResponse({
    description: '유저의 정보를 찾아 옵니다.',
    type: UserRes,
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
  // @ApiNotFoundResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: UserNotFoundError.message,
  // })
  // @ApiUnauthorizedResponse({
  //   description: `${USER_AUTH.AccessTokenExpired} or ${USER_AUTH.NoTokenProvided} 메세지가 뜹니다`,
  // })
  @ApiBearerAuth('Authorization')
  async execute(@User() user: TDecodePayload): Promise<IRes<UserEntity>> {
    const query = new GetOwnInfoQuery({ index: user.id });

    const result: Result<UserEntity, NotFoundException> =
      await this.queryBus.execute(query);

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
