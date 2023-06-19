import Image from 'next/image';
import styled from 'styled-components';

import Contact from './contact.svg';
import Content from './content.svg';
import Magicpen from './magicpen.svg';
import User from './user.svg';

const Bar = styled.nav`
  position: absolute;
  width: 100%;
  top: 0;
  padding: 36px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1440px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  button {
    width: 160px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radisu: 4px;

    font-size: 20px;
  }
`;

const SVG_SIZE = 32;

export default function Topbar() {
  const SVG = ({ src }: { src: string }) => {
    return <Image src={src} alt={''} width={32} height={32} />;
  };

  return (
    <Bar>
      <Image
        src={'/images/landing/logo_medium.png'}
        alt={'logo_medium'}
        width={204}
        height={48}
      />
      <ButtonsContainer>
        <button>
          <Content width={32} height={32} />
          <p>콘텐츠 분석</p>
        </button>
        <button>
          <Magicpen width={32} height={32} />
          <p>키워드 분석</p>
        </button>
        <button>
          <User width={32} height={32} />
          <p>내 채널 분석</p>
        </button>
        <button>
          <Contact width={32} height={32} />
          <p>Contact</p>
        </button>
      </ButtonsContainer>
    </Bar>
  );
}
