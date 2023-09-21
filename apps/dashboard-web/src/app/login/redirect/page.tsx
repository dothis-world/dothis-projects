// import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { TEST } from '@/constants/test';
import { apiInstance } from '@/utils/apiInstance';

import Client from './client';

const RedirectPage = () => {
  const cookiesStore = cookies();

  const accessToken = cookiesStore.get('Authorization');

  if (accessToken) {
    /**
     * 서버 쪽 apiInstance header 세팅하는 코드
     */
    apiInstance.defaults.headers.common['Authorization'] = accessToken.value;

    // 근데 이거를 layout 처럼 매번 시켜줄 수는 없다.
    //login Success일때 저렇게 세팅을 해주는 코드를 작성
    // AuthProvider는 useEffect 에 polling으로 accessToken을 주기적으로 보내주는 것이다. (polling 은 풀릴걱정이 없다 -> 왜냐하면 렌더링 상관없이 주기적으로 요청을 보내는 것이기 때문)
    // Slient RefreshToken
    // 병국님께 여쭤보기  verifyToken이  access토큰만인지??? 아니면 refresh도 포함인지
    // 만약 refresh가 포함이 아니라면 refresh도 관통하는 로직도 생각해봐야함
    // 그럼 이제 자동로그인은 state가 있어야한다.
    // 전역으로 할지 아니면, context로 할지
    //일어나서 브라우저 정리
  }
  return (
    <>
      <Client accessToken={accessToken?.value} />
    </>
  );
};

export default RedirectPage;
