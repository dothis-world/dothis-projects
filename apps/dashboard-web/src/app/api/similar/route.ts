import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { keyword, tags, cluster, subscribers, channelId } = await req.json();

  // Promise.all을 사용하여 모든 fetch 요청이 완료될 때까지 기다립니다. (해당 기능은 gender 나 age에 따른 조건이 추가될 때 삽입예정)
  const responseDataArray = await similarChanneldAPI({
    keyword,
    tags,
    cluster,
    subscribers,
    channelId,
  });

  // 모든 fetch 요청의 결과를 리턴합니다.
  return NextResponse.json(responseDataArray);
  // } catch (error) {

  //   // 에러가 발생한 경우에 대한 처리
  //   return Response.json({ error: 'An error occurred' });
  // }
}

async function similarChanneldAPI({
  keyword,
  tags,
  cluster,
  subscribers,
  channelId,
}: {
  keyword: string[];
  tags: string[];
  cluster: number;
  subscribers: number;
  channelId: string;
}): Promise<any> {
  const response = await fetch(
    'http://dothis2.iptime.org:8003/nlp/channelsimiler',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ntop: 10,
        channel_id: channelId,
        cluster: cluster,
        subscribers: subscribers,
        keywords: keyword.join(','),
        tags: tags.join(','),
      }),
    },
  );

  return response.json();
}
