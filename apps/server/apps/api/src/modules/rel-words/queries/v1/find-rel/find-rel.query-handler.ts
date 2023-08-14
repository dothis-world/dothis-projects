import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from '../../../interface/find-rel.adapter';
import { RelatedWordsEntity } from '@Apps/modules/rel-words/repository/entity/related_words.entity';
import { FindRelQuery } from '@Apps/modules/rel-words/queries/dtos/find-rel.dto';

@QueryHandler(FindRelQuery)
export class FindRelQueryHandler
  implements IQueryHandler<FindRelQuery, RelatedWordsEntity>
{
  @Inject(RELWORDS_DI_TOKEN.FIND_ONE) private readonly query: FindRelAdapter;
  execute(query: FindRelQuery): Promise<RelatedWordsEntity> {
    console.log('내가 볼떈 여긴데');
    return this.query.findOneByKeyword(query.keyword);
  }
}
