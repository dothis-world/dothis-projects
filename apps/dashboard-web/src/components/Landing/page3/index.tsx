import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { NOT_FOUND } from '@/constants/route';

import { Category, CategroiesContainer, MoreButton } from '../style';
import { Background, ImageBox, Main } from './style';

export default function Page3() {
  const [state, setState] = useState<number>(0);
  const titles = [
    '내 관심사',
    '연관 소재',
    '경쟁 강도',
    '조회수 예측',
    '구독자 구간',
  ];

  const router = useRouter();

  return (
    <Background>
      <Main>
        <h3>🔎 내 관심사 그대로 맞춤 키워드 분석</h3>
        <p>
          <b>내 채널의 관심사</b>부터 시작해 앞으로 다룰만한 콘텐츠 소재의{' '}
          <b>조회수 예측</b>까지 알 수 있어요
        </p>
        <CategroiesContainer>
          {titles.map((value: string, key: number) => {
            return (
              <Category
                key={`page3_menu_${key}`}
                onClick={() => {
                  setState(key);
                }}
                select={state === key ? 1 : 0}
              >
                {value}
              </Category>
            );
          })}
        </CategroiesContainer>

        <ImageBox>
          <Image
            src={`/images/landing/keyword_0${state + 1}.png`}
            alt={`${state} image`}
            width={0}
            height={0}
            sizes={'100%'}
            fill
          />
        </ImageBox>
        <MoreButton
          onClick={() => {
            alert('준비중입니다');
          }}
        >
          더 알아보기
        </MoreButton>
      </Main>
    </Background>
  );
}
