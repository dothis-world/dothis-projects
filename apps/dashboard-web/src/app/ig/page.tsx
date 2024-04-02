'use client';

import axios from 'axios';
import React, { useEffect } from 'react';
const token =
  'IGQWRNZAXNBX244dUdyd2t6SmhGSTdaTl8tVVdRb0FYNWlXLXYwdGVUTkVxR3ZAicW8tcVo2T1hFT2JxZAEFYQ0V2TnhfZA2pud1NURllFTm85dDlkTHEtTE01TGdNc3JwMlEwb2FoQkR0cWk2NXJOMFJiMmFZAN0I5SFUZD';

const token2 =
  'IGQWRQZAHRtUVFiRDdBcXZASY1dfVENmbEJKMG50TjRvN045ZAjRfWUxaYjZAIY2xXdlVMN3h2QlB6ZA29VN1daMDMtSWlUMWh3dEFHRWZA6ei05SWVKcE0yb3R4bUpxWUp1eHFKUWpCdmw1dHRKd3A1TFFHRWY5aTNzNjAZD';
const Page = () => {
  useEffect(() => {
    async function sendRequest() {
      const response = await axios.post('http://localhost:3666/api/test');
      console.log(response);
    }
    sendRequest();

    async function test() {
      const data = await axios.get(
        `https://graph.instagram.com/me?fields=id,name,username&access_token=${token2}`,
      );
      console.log(data);
    }

    test();
  }, []);
  return <div>테스트</div>;
};
// `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${token}`,
//  `https://graph.instagram.com/me??fields=id&access_token=${token}`,
export default Page;

// async function test() {
//     const data = await axios.get(
//       'https://graph.facebook.com/v19.0/ig_hashtag_search?user_id=6671642876269302&q=bluebottle&access_token=AQBNjQyrsnYu442qjSA6BayibEs9MzTRfXap8O8pFpI04fcWrM_s41Uoy73B7XZ39n_4fY9UyoC65btU_AeXV-q2srOws1zOVsYoJoksFGi7hHkfMqUUGq2nUL9f_2QBB5TsuKxDIGHuWqsqvGsr8vp24DrZbcUs2p87lWmec0GH8FY_fMZXFr1T_Bws3Ey-IgmgQg_IfQKTrZhuPrh_ByTy0B17hqcFuRoAtFq099KvaA#_',
//     );
//     console.log(data);
//   }

// type Measurable = { getBoundingClientRect(): ClientRect };

// const MyComponent: React.FC = () => {
//   const element1Ref = React.useRef<HTMLDivElement | null>(null);

//   const get = (tt: Measurable) => {};
//   get({getBoundingClientRect():element1Ref.current?.getBoundingClientRect()});

//   // 이후에 element1Ref를 요소에 할당하는 로직 등이 이어질 수 있음

//   return <div ref={element1Ref}>Element 1</div>;
// };
