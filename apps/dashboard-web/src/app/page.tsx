import { cookies } from 'next/headers';

import { verifyToken } from '@/api/verify';
import GoogleBtn from '@/components/Login/GoogleBtn';

export default async function RootPage(props: any) {
  const cookieStore = cookies().get('Authorization')?.value;

  const data = await verifyToken({ cookie: cookieStore });

  return <div>초기화면</div>;
}
