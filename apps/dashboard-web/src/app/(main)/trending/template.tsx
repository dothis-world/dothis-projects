'use client';

import type { PropsWithChildren } from 'react';

const TrendingPageTemplate = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="p-[24px]">
        <h3 className="text-grey600 font-bold">검색 키워드</h3>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className="bg-grey200">{children}</div>
    </>
  );
};

export default TrendingPageTemplate;