import { Flex } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { clsx } from 'clsx';
import {} from 'next/';
import type { ReactNode } from 'react';
import { globalStyle } from '~/../../packages/share';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={clsx()}>

      <Global styles={globalStyle} />
      root layout
      <Flex>{children}</Flex>
    </html>
  );
}
