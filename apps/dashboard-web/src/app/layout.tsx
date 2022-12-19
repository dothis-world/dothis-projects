import './globalStyle.css';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import Footer from '@/app/components/Footer';

import ClientContext from './ClientContext';
import GNB from './components/GNB';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={clsx()}>
      <body>
        <ClientContext>
          <GNB />
          {children}
          <Footer />
        </ClientContext>
      </body>
    </html>
  );
}
