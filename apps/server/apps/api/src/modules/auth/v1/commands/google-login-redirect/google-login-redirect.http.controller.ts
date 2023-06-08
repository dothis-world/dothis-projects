import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard, User } from '@Libs/commons/src';
import { CommandBus } from '@nestjs/cqrs';
import { UserInfoCommandDto } from 'apps/api/src/modules/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const { getGoogleRedirect } = nestControllerContract(apiRouter.auth);
const { pathParams, description, summary, responses } = getGoogleRedirect;

@ApiTags(pathParams)
@Controller()
export class GoogleLoginRedirectHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(getGoogleRedirect)
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary, description })
  @ApiOkResponse({
    description: responses[200],
  })
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @User() userInfo: UserInfoCommandDto,
  ) {
    const token: { accessToken: string; refreshToken: string } =
      await this.commandBus.execute(new UserInfoCommandDto(userInfo));

    res.setHeader('Authorization', 'Bearer ' + token.accessToken);
    res.cookie('refreshToken', token.refreshToken);
    res.cookie('google_access_token', userInfo.googleAccessToken);
    res.cookie('google_refresh_token', userInfo.googleRefreshToken);

    return {
      message: 'Dothis Authentication',
    };
  }
}
