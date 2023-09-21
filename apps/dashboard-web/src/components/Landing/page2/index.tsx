import Image from 'next/image';

import { Background, Description, ImageBox, Main, Text, Title } from './style';

export default function Page2() {
  return (
    <Background>
      <Main>
        <Text>
          <Title>
              주제부터 스크립트까지<br /> 두디스로 한 번에
          </Title>
        </Text>
        <ImageBox>
          <Image
            src={'/images/landing/page2.png'}
            alt={''}
            width={680}
            height={560}
            sizes="100%"
          />
        </ImageBox>
        <Text>
          <Title>
            유튜브 콘텐츠, <br /> 10분만에 기획을 간단하게
          </Title>
          <Description>
            조회수 높이는 맞춤형 소재부터 포맷에 따른 <br />
            스토리보드 도구까지 한곳에서 간편하게!
          </Description>
          <button
            onClick={() => {
              alert('준비중입니다');
            }}
          >
            더 알아보기
          </button>
        </Text>
      </Main>
    </Background>
  );
}
