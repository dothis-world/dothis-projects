'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';

import { useLogOutMutation } from '@/hooks/react-query/mutation/useLogOutMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useAuthActions } from '@/store/authStore';

const MyPageContent = () => {
  const { data: userData } = useGetUserInfo();

  const router = useRouter();

  const { setIsSignedIn } = useAuthActions();

  const { mutate } = useLogOutMutation();

  const handleLogOut = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          setIsSignedIn(false);
          router.replace('/');
        },
      },
    );
  };

  return (
    <>
      <ul className="mb-[23px] mt-10 flex flex-col gap-[23px]">
        <li className="text-grey700 flex font-bold">
          <p className="w-24">이메일</p> <p>{userData?.userEmail}</p>
        </li>
        <li className="text-grey700 flex font-bold">
          <p className="w-24">회원등급</p> <p>{userData?.plan}</p>
        </li>
        <li className="text-grey700 flex font-bold">
          <p className="w-24">알림</p> <p></p>
        </li>
      </ul>
      <Button size="M" theme="contained" onClick={handleLogOut}>
        로그아웃
      </Button>
    </>
  );
};

export default MyPageContent;
