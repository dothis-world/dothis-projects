import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='ko' className={clsx()}>
      <body>

        root layout
        {children}
      </body> 
    </html>
  );
}
