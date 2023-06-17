import styled from 'styled-components';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

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

const Buttons = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 20px;
`;

const PriceCategory = styled.table``;

export default function Price() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Buttons>
        {TEXT.map((value, key) => {
          return <Button key={`header_buttons_${key}`}> {value}</Button>;
        })}
        <button> 옆 </button>
      </Buttons>

      <h2>유튜브 콘텐츠 기획 시작하기</h2>
      <p>
        하루 330원으로 더 고도화된 분석, 강력한 AI, 더 쾌적한 서비스 환경 등이
        제공됩니다.
      </p>

      <PriceCategory>
        <tr>
          <th>시작하기</th>
          <th>Trial</th>
          <th>Basic</th>
          <th>Pro</th>
        </tr>
        <tr>
          <td>요금/기간</td>
          <td>무료/무제한</td>
          <td>9,900/30일</td>
          <td>49,500원/30일</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button>시작하기</button>
          </td>
          <td>
            <button>14일 무료 체험</button>
          </td>
          <td>
            <button>14일 무료 체험</button>
          </td>
        </tr>
      </PriceCategory>
      <div>이미지가 들어갈 공가아안</div>
      <Footer />
    </div>
  );
}
