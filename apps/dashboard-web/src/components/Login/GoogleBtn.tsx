import type { Route } from 'next';
import Link from 'next/link';

import { HTTP_BASE_URL } from '@/constants/http';

import SvgComp from '../../share/SvgComp';

const GoogleBtn = () => {
  return (
    <Link
      className="mt-[3.75rem] block w-full"
      href={(HTTP_BASE_URL + '/v1/auth/google-login') as Route}
    >
      <div className="border-grey200 flex w-full items-center justify-center rounded-lg border border-solid py-4 text-center">
        <button className="inline-flex gap-[0.7rem]">
          <SvgComp icon="GoogleSvg" size={26} />
          <p className="text-grey900 font-bold">Google 로그인</p>
        </button>
      </div>
    </Link>
  );
};

export default GoogleBtn;
