import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from '../../../interface/find-rel.adapter';
import { FindRelV1Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';
import { RelwordsRes } from '@Libs/commons/src/types/dto.types';
import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/rel-words/domain/relwords.errors';

@QueryHandler(FindRelV1Query)
export class FindRelQueryHandler
  implements
    IQueryHandler<FindRelV1Query, Result<RelwordsRes, RelwordsNotFoundError>>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE) private readonly query: FindRelAdapter,
  ) {}
  async execute(
    query: FindRelV1Query,
  ): Promise<Result<RelwordsRes, RelwordsNotFoundError>> {
    const res = await this.query.findOneByKeyword(query.keyword);
    if (!res) return Err(new RelwordsNotFoundError());
    return Ok(res);
  }
}
