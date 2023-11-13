'use client';

import { create } from 'lodash';
import type { Route } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import { cn } from '@/utils/cn';

export type ArticleType = (typeof TabNavData)[number]['category'];

interface MediaArticlesTabNavProps {
  selectedArticle: ArticleType;
}

export const TabNavData = [
  { title: '유튜브', category: 'youtube' },
  // { title: '커뮤니티', category: 'community' },
  // { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

const MediaArticlesTabNav = ({ selectedArticle }: MediaArticlesTabNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <header
      id="media"
      className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]"
    >
      {TabNavData.map((item, index) => (
        <>
          <Link
            href={
              (pathname +
                '?' +
                createQueryString('relatedContent', item.category) +
                '#media') as Route
            }
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

export default MediaArticlesTabNav;
