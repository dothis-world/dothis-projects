import './globalStyle.css';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import Footer from '@/app/components/Footer';

import GNB from './components/GNB';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='ko' className={clsx()}>
    <body>

    <GNB/>
    {children}
    <Footer />
    </body>
    </html>
  );
}
