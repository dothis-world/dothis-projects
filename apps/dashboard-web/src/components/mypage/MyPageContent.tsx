'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';

import { useLogOutMutation } from '@/hooks/react-query/mutation/useLogoutMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';

const MyPageContent = () => {
  const { data: userData } = useGetUserInfo();

  const { mutate } = useLogOutMutation();

  const handleLogOut = () => {
    mutate({});
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
