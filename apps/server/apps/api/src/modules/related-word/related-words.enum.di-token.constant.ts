export enum RELWORDS_DI_TOKEN {
  FIND_ONE = 'RELWORDS_DI_TOKEN_FIND_ONE',
  FIND_ONE_BY_ELASTICACHE = 'RELWORDS_DI_TOKEN_FIND_ONE_BY_ELASTICACHE',

  FIND_ALL_BY_SQL = 'RELWORDS_DI_TOKEN_FIND_ALL',

  UPDATE_RELWORDS = 'RELWORDS_DI_TOKEN_UPDATE_RELWORDS',
  DELETE_KEYWORD = 'RELWORDS_DI_TOKEN_DELETE_KEYWORD',
}

export const TOKEN_GET_VIDEO_HISTORY_SINGLE = Symbol(
  'TOKEN_GET_VIDEO_HISTORY_SINGLE',
);
export const RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE = Symbol(
  'TOKEN_GET_VIDEO_HISTORY_MULTIPLE',
);
export const CACHE_CLIENT = Symbol('CACHE_CLIENT');

export const CACHE_FIND_ALL_QUERY = Symbol('CACHE_FIND_ALL_QUERY');

export const CACHE_SET_DIC_TERM = Symbol('CACHE_SET_DIC_TERM');

export const RANKING_V2_SERVICE_DI_TOKEN = Symbol(
  'RANKING_V2_SERVICE_DI_TOKEN',
);
/**
 * 연관어 랭킹 redis에서 받아오는 id_token
 */
export const GET_RANKING_RELATED_WORD_DI_TOKEN = Symbol(
  'GET_RANKING_RELATED_WORD_DI_TOKEN',
);

export const SET_RANKING_RELATED_WORD_DI_TOKEN = Symbol(
  'SET_RANKING_RELATED_WORD_DI_TOKEN',
);
export const GET_SEARCH_WORD_DI_TOKEN = Symbol('GET_SEARCH_WORD_DI_TOKEN');
export const KOREAN_AUTO_COMPLETE_DI_TOKEN = Symbol(
  'KOREAN_AUTO_COMPLETE_DI_TOKEN',
);
