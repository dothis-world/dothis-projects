'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

const Page = () => {
  return (
    <div>
      <p>xp</p>

      <Image
        src="https://www.instagram.com/p/C0B3KxCrSs2/media?size=l"
        alt="이미지"
        width={150}
        height={150}
      />
    </div>
  );
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
