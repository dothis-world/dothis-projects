import { z } from 'zod';
import { c } from '../contract';
import { zKeywordModel, zUserModel } from './user.model';

export const userBaseApiUrl = '/user';

export const userApi = c.router({
  getUser: {
    method: 'GET',
    path: `${userBaseApiUrl}/:id`,
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: zUserModel,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '유저를 가져옵니다. (관리자 콘솔용) ',
    description: '유저 index로 유저를 찾아 옵니다.',
  },
  getUserChannelData: {
    method: 'POST',
    path: `${userBaseApiUrl}/get-channel-data`,
    body: {},
    responses: {
      200: '성공적으로 채널데이터를 저장한다면 성공 여부를 리턴한다.',
      401: '채널에 이미 저장된 데이터가 있다면 오류를 리턴한다.',
      404: 'Not Found',
      500: '구글 서버에 문제가 있거나 구글 auth 내용이 비정상적이라면 리턴한다.',
    },
    summary: '유저 채널 데이터 저장하기',
    description:
      '유저가 채널 데이터를 가져오기 하면 크롤링된 channel 테이블에서 userChannelData 테이블로 이동, 추후 로직이 변경 될수 있음(2023.02.06일 기준)',
  },
  getUserKeyword: {
    method: 'GET',
    path: `${userBaseApiUrl}/keyword`,
    responses: {
      200: zKeywordModel,
      404: 'Not Found',
      500: 'server error',
    },
    summary: '유저 채널 키워드 겟하기',
    description: '유저의 채널 키워드를 가져온다',
  },
  putUpdatePersonalTag: {
    method: 'PUT',
    path: `${userBaseApiUrl}/personal-tag`,
    responses: {
      200: '개인화 태그를 업데이트하면 성공 여부를 리턴한다.',
      404: 'Not Found',
      500: 'server error',
    },
    body: z.object({ tag: z.array(z.string()) }),
    summary: '유저 개인화 태그 넣기',
    description:
      '유저 개인화 태그 넣기 사용자가 선택한 탐색어는 단어뒤에나 #을 붙혀서 저장하는게 좋을꺼 같습니다. 검색 기록이라고 부르시는거는 아무것도 안붙혀도 될것같습니다.',
  },
  putSearchWord: {
    method: 'PUT',
    path: `${userBaseApiUrl}/search-word`,
    responses: {
      200: 'search-word를 업데이트하면 성공 여부를 리턴한다.',
      404: 'Not Found',
      500: 'server error',
    },
    body: z.object({ searchWord: z.array(z.string()) }),
    summary: '유저 검색 태그 넣기',
    description: '유저 검색 태그 업데이트 합니다.',
  },
  putAgreePromotion: {
    method: 'PUT',
    path: `${userBaseApiUrl}/agree-promotion`,
    responses: {
      200: '성공적으로 약관 동의를 하면 성공 여부를 리턴한다.',
      404: 'Not Found',
      500: 'server error',
    },
    body: z.object({ isAgree: z.boolean() }),
    summary: '유저 약관 동의 여부',
    description: '동의 여부 불리언',
  },
  putAdminUserEnv: {
    method: 'PUT',
    path: `${userBaseApiUrl}/admin/env`,
    responses: {
      200: '성공적으로 변경되면 성공 여부를 리턴한다.',
      404: 'Not Found',
      500: 'server error',
    },
    body: z.object({ isEnvLocal: z.boolean() }),
    summary: '환경 개발/프로덕션 변경 (관리자 콘솔용)',
    description:
      '환경 개발/프로덕션 해당 아이디로 로그인되고 리다이렉션될때, 로컬로 가느냐 프로덕션 환경으로 가느냐 설정하게 끔 변경하는 api',
  },
});
