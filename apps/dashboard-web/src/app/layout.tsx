import '@/styles/global.css';

import clsx from 'clsx';
import Head from 'next/head';
import type { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from '@/app/StyledComponentsRegistry';
import Analytics from '@/components/Analytics';
import { pretendard } from '@/styles/font';
import StyledTheme from '@/styles/StyledTheme';

import ClientContext from './ClientContext';
import RootHeader from './head';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <Head>
        <RootHeader />
        <Analytics />
      </Head>
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
