'use client';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import {
  Background,
  Best_bottom,
  Best_mid,
  Best_name,
  Best_top,
  TagContainer,
  ImageBox,
  Main,
  Pink,
  PriceCategory,
  Tag,
  Td_start,
  Th_start,
  Tag_select,
  RightButton,
  Gradient,
} from './style';
import { useRouter } from 'next/navigation';
import { pricing } from '@/constants/route';
import Right from './right.svg';

const TEXT = [
  '부동산',
  '수도권 아파트 분양',
  '아파트',
  '전세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
  '부동산시세',
];

export default function Price() {
  const router = useRouter();
  return (
    <Background>
      <Header />
      <Sidebar />

      <Main>
        <TagContainer>
          <Gradient />
          <div>
            {TEXT.map((value, key) => {
              return key === 1 || key === 0 ? (
                <Tag_select key={`header_TagContainer _${key}`}>
                  {value}
                </Tag_select>
              ) : (
                <Tag key={`header_TagContainer _${key}`}> {value}</Tag>
              );
            })}
          </div>
          <RightButton>
            <Right width={5} height={10} />
          </RightButton>
        </TagContainer>

        <h2>유튜브 콘텐츠 기획 시작하기</h2>
        <p>
          <Pink>하루 330원</Pink>으로 더 고도화된 분석, 강력한 AI, 더 쾌적한
          서비스 환경 등이 제공됩니다.
        </p>

        <PriceCategory>
          <tr>
            <Th_start>시작하기</Th_start>
            <th>Trial</th>
            <Best_top>
              <Best_name>BEST</Best_name>
              Basic
            </Best_top>
            <th>Pro</th>
          </tr>
          <tr>
            <Td_start>요금 / 기간</Td_start>
            <td>무료 / 무제한</td>
            <Best_mid>9,900 / 30일</Best_mid>
            <td>49,500원 / 30일</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  router.push(pricing);
                }}
              >
                시작하기
              </button>
            </td>
            <Best_bottom>
              <button
                onClick={() => {
                  router.push(pricing);
                }}
              >
                14일 무료 체험
              </button>
            </Best_bottom>
            <td>
              <button
                onClick={() => {
                  router.push(pricing);
                }}
              >
                14일 무료 체험
              </button>
            </td>
          </tr>
        </PriceCategory>
        <ImageBox>이미지가 들어갈 공가아안</ImageBox>
      </Main>
      <Footer />
    </Background>
  );
}
