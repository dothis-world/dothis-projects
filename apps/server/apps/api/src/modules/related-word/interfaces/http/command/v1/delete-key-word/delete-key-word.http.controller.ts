import { DeleteKeyWordCommandDto } from '@Apps/modules/related-word/application/dtos/delete-key-word.dto';
import {
  DeleteRelWordsBody,
  DeleteRelWordsParams,
} from '@Apps/modules/related-word/application/dtos/delete-rel-words.dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { JwtAccessGuard } from '@Libs/commons/src';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';
import { relatedWordsApi } from '@dothis/dto';
import {
  Body,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { TDeleteKeyWordCommandHandlerRes } from './delete-key-word.command-handler';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';

@ApiTags('연관어')
@Controller()
export class DeleteRelWordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  @UseGuards(JwtAccessGuard, IsAdminGuard)
  //   @ApiOperation({
  //     summary: relatedWordsApi.deleteRelatedWords.summary,
  //     description: relatedWordsApi.deleteRelatedWords.description,
  //   })
  //   @ApiOkResponse({
  //     type: DeleteRelWordsSuccessBase,
  //   })
  //   @ApiNotFoundResponse({
  //     description: '없는 id들어왔거나, 없는 연관어 삭제시에',
  //   })
  //   @ApiInternalServerErrorResponse({
  //     type: InternalServerErr,
  //   })
  @TsRestHandler(relatedWordsApi.deleteRelatedWords)
  async execute(
    @Param() param: DeleteRelWordsParams,
    @Body() body: DeleteRelWordsBody,
  ) {
    return tsRestHandler(
      relatedWordsApi.deleteRelatedWords,
      async ({ params, body: reqBody }) => {
        const command = new DeleteKeyWordCommandDto(params.id);

        const res = await this.commandBus.execute(command);

        return match<TDeleteKeyWordCommandHandlerRes, TTsRestRes<IRes<void>>>(
          res,
          {
            Ok: (res) => ({
              status: 201,
              body: {
                success: true,
                data: res,
              },
            }),
            Err: (err: Error) => {
              if (err instanceof KeywordsNotFoundError) {
                throw new NotFoundException(err.message);
              }
              throw err;
            },
          },
        );
      },
    );
  }
}
