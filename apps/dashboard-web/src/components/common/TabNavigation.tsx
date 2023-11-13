'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utils/cn';

export type ArticleType = (typeof TabNavData)[number]['category'];

export type NavData = {
  title: string;
  category: string;
  queryKey: string;
  queryValue: string;
  hash?: string;
}[];

interface MediaArticlesTabNavProps<T> {
  selectedArticle: ArticleType;
}

export const TabNavData = [
  { title: '유튜브', category: 'youtube' },
  // { title: '커뮤니티', category: 'community' },
  // { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

type TestObject = {
  title: string;
  category: string;
};
const TabNavigation = <T,>({
  selectedArticle,
}: MediaArticlesTabNavProps<T>) => {
  return (
    <header
      id="media"
      className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]"
    >
      {TabNavData.map((item, index) => (
        <>
          <Link
            href={{
              pathname: 'contents',
              query: { relatedContent: item.category },
              hash: 'media',
            }}
            replace
            className={cn('cursor-pointer text-[32px] font-bold', {
              'text-grey700': selectedArticle === item.category,
            })}
          >
            {item.title}
          </Link>
          {index !== TabNavData.length - 1 && (
            <p className="text-[32px] font-bold">/</p>
          )}
        </>
      ))}
    </header>
  );
};

export default TabNavigation;
