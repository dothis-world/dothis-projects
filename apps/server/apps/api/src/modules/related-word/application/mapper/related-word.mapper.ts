import { RelWordsRankingRes } from '@Libs/commons/src/interfaces/types/res.types';

export class RelatedWordMapper {
  static toObject(caches: string[]): RelWordsRankingRes[] {
    const result: RelWordsRankingRes[] = [];

    for (let i = 0; i < caches.length; i += 2) {
      const cache = caches[i];
      const score = caches[i + 1];
      const [word, sortFigure, expectedViews] = cache.split(':');

      result.push({
        word,
        sortFigure: Number(sortFigure),
        expectedViews: Number(expectedViews),
      });
    }

    return result;
  }
}
