export declare const cacheBaseApiUrl = '/cache';
export declare const cacheApi: {
  set: {
    method: 'GET';
    path: '/cache/term-update';
    pathParams: string;
    responses: {
      200: string;
      401: string;
      500: string;
    };
    summary: '탐색어를 redis에 업데이트 하기위해 크롤링서버에서 http 요청을 받습니다.';
    description: 'http 요청을 받아 자동으로 redis에 업데이트합니다.';
  };
  get: {
    method: 'GET';
    path: '/cache/term';
    query: string;
    responses: {
      200: string;
      401: string;
      500: string;
    };
    summary: '탐색어를 redis에 불러옵니다.';
    description: '탐색어를 redis에 불러옵니다.';
  };
};
//# sourceMappingURL=cache.api.d.ts.map
