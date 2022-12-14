import { apiClient } from '@/app/apiClient';

export async function getData() {
  let resp = await apiClient.get('/users/:id', { params: { id: 1 } });

  console.log(resp);
  return resp;
}

export default async function RootPage() {
  const d = await getData();
  console.log(d);
  return (
    <div>
      {d.id} {d.name}
    </div>
  );
  // return <div>ㅇㅇㅇ</div>;
}
