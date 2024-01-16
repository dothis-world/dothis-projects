/* eslint-disable @next/next/no-script-component-in-head */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import '@/styles/global.css';

import clsx from 'clsx';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from '@/app/StyledComponentsRegistry';
import Analytics from '@/components/Analytics';
import { pretendard } from '@/styles/font';
import StyledTheme from '@/styles/StyledTheme';

import ClientContext from './ClientContext';

export const metadata: Metadata = {
  title: '두디스 - 데이터 기반 영상 기획 도구',
  description: '데이터로 기획하는 영상 기획 도구, 두디스',
  openGraph: {
    type: 'website',
    title: '두디스(Dothis)',
    description: '데이터로 기획하는 영상 기획 도구, 두디스.',
    images:
      'https://dothis-lending.s3.ap-northeast-2.amazonaws.com/dothisLogo.png',
    url: 'https://dothis.kr',
  },
  verification: {
    google: 'jKXKt6DfOazkbZWSOTusR4De32UKhBG2pey4WTVnU9c',
    other: {
      ['naver-site-verification']: '61cf01795f8a825e98136f98401fd7f3aa1bfa20',
    },
  },
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <Analytics />
      </head>
      <body
        className={clsx(pretendard.className, 'text-[16px]')}
        suppressHydrationWarning={true}
      >
        <StyledComponentsRegistry>
          <StyledTheme>
            <ClientContext>{children}</ClientContext>
          </StyledTheme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
