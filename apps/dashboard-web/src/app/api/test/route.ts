import axios from 'axios';

// Set the runtime to edge for best performance
export const runtime = 'edge';

const request_body = (ages: string[], gender?: string) => {
  return {
    startDate: '2017-01-01',
    endDate: '2017-04-30',
    timeUnit: 'month',
    keywordGroups: [
      {
        groupName: '한글',
        keywords: ['한글', 'korean'],
      },
    ],
    device: 'pc',
    ages,
    gender: gender ? gender : undefined,
  };
};

// 날짜랑 키워드,연관어만 안달라지면 무조건 캐시해도 되잖아.

export async function POST(req: Request) {
  try {
    // 병렬로 처리할 fetch 요청을 배열에 담습니다.

    const data = await fetchWithNaverAPI();

    // 모든 fetch 요청의 결과를 리턴합니다.
    console.log('test');
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log('error');
    console.error(error);
    // 에러가 발생한 경우에 대한 처리
    return Response.json({ error: 'An error occurred' });
  }
}

async function fetchWithNaverAPI(ages?: string[], gender?: string) {
  const response = await fetch(
    'https://api.instagram.com/oauth/access_token',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: '3630087990574889',
        client_secret: 'dc559440bd39f2fd51f412b236ac0484',
        grant_type: 'authorization_code',
        redirect_uri: 'https://www.dothis.kr/',
        code: 'AQBNjQyrsnYu442qjSA6BayibEs9MzTRfXap8O8pFpI04fcWrM_s41Uoy73B7XZ39n_4fY9UyoC65btU_AeXV-q2srOws1zOVsYoJoksFGi7hHkfMqUUGq2nUL9f_2QBB5TsuKxDIGHuWqsqvGsr8vp24DrZbcUs2p87lWmec0GH8FY_fMZXFr1T_Bws3Ey-IgmgQg_IfQKTrZhuPrh_ByTy0B17hqcFuRoAtFq099KvaA#_',
      }),
    },
  );
  const data = await response.json();

  return data;
}
