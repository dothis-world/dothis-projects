'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { OAuthProviderType } from 'next-auth/providers';
import { signIn, signOut, useSession } from 'next-auth/react';

import CalendarContainer from '@/components/common/Calendar/CalendarContainer';

const Page = () => {
  const { data: session } = useSession(); //세션 정보를 가져옴

  const hanldeLoginButton = async (provider: OAuthProviderType) => {
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: 'http://localhost:3666',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <CalendarContainer /> */}
      {/* <nav className="flex items-center justify-between px-6"> */}
      <ul className="flex items-center gap-4 p-4">
        {session ? ( //세션 정보가 있으면 signOut()호출
          <button onClick={() => signOut()}>ddd</button>
        ) : (
          //세션 정보가 없으면 signIn()호출
          <button
            onClick={async () =>
              await signIn('facebook', {
                callbackUrl: `${window.location.origin}`,
              })
            }
            className="border p-8"
          >
            페이스북 로그인t
          </button>
        )}
      </ul>

      {/* </nav> */}

      <div className="m-5">
        인스타 이미지 로드 확인
        <Image
          src="https://www.instagram.com/p/C0B3KxCrSs2/media?size=l"
          alt="이미지"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default Page;
