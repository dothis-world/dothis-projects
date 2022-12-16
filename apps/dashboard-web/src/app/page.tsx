import { apiClient } from '@/utils/apiClient';

import ClientTest from './ClientTest';

export async function getData() {
  let resp = await apiClient.get('/users');

  console.log(resp);
  return resp;
}

export default async function RootPage() {
  const data = await getData();
  return (
    <div>
      {data.map((d) => (
        <p key={d.id}>
          users: {d.id} {d.name}
        </p>
      ))}
      <ClientTest />
    </div>
  );
  // return <div>ㅇㅇㅇ</div>;
}
