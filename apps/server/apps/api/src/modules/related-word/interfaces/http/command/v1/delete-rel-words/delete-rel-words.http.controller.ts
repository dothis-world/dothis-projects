import {
  Body,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { RelatedWordModel, relatedWordsApi } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  DeleteRelWordsBody,
  DeleteRelWordsCommandDto,
  DeleteRelWordsParams,
  DeleteRelWordsSuccessBase,
  InternalServerErr,
} from '@Apps/modules/related-word/application/dtos/delete-rel-words.dto';
import { match } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { TDeleteRelWordsCommandHandlerRes } from './delete-rel-words.command-handler';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { JwtAccessGuard } from '@Libs/commons/src';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';

@ApiTags('연관어')
@Controller()
export class DeleteRelWordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  @UseGuards(JwtAccessGuard, IsAdminGuard)
  @ApiOperation({
    summary: relatedWordsApi.deleteRelatedWords.summary,
    description: relatedWordsApi.deleteRelatedWords.description,
  })
  @ApiOkResponse({
    type: DeleteRelWordsSuccessBase,
  })
  @ApiNotFoundResponse({
    description: '없는 id들어왔거나, 없는 연관어 삭제시에',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @TsRestHandler(relatedWordsApi.deleteRelatedWords)
  async execute(
    @Param() param: DeleteRelWordsParams,
    @Body() body: DeleteRelWordsBody,
  ) {
    return tsRestHandler(
      relatedWordsApi.deleteRelatedWords,
      async ({ params, body: reqBody }) => {
        const command = new DeleteRelWordsCommandDto(
          params.id,
          reqBody.deleteRelWords,
        );

        const res = await this.commandBus.execute(command);

        return match<
          TDeleteRelWordsCommandHandlerRes,
          TTsRestRes<IRes<RelatedWordModel>>
        >(res, {
          Ok: (res) => ({
            status: 201,
            body: {
              success: true,
              data: res,
            },
          }),
          Err: (err: Error) => {
            if (
              err instanceof RelwordsNotFoundError ||
              err instanceof KeywordsNotFoundError
            ) {
              throw new NotFoundException(err.message);
            }
            throw err;
          },
        });
      },
    );
  }
}
