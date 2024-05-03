import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { PutEnvDtos } from '@Apps/modules/user/dtos/put-env.dtos';
import { match, Result } from 'oxide.ts';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
const c = nestControllerContract(apiRouter.user);
const { putAdminUserEnv } = c;
const { responses, description, summary } = putAdminUserEnv;
@Controller()
@ApiTags('유저 관련')
export class PutEnvHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard, IsAdminGuard)
  @TsRest(putAdminUserEnv)
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
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    description: '성공여부를 리턴합니다.',
  })
  @ApiBody({
    isArray: false,
    type: Boolean,
    description: '리다이렉션 환경, {isEnvLocal: boolean}',
    required: true,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({})
  async execute(
    @User() user: UserInfoCommandDto,
    @Body('isEnvLocal') isEnvLocal: boolean,
  ) {
    const arg = new PutEnvDtos({
      id: user.id,
      isEnvLocal,
    });

    const result: Result<boolean, InternalServerErrorException> =
      await this.commandBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof InternalServerErrorException)
          throw new InternalServerErrorException(err.message);
        throw err;
      },
    });
  }
}
