'use client';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function ClientContext({ children }: Props) {
  return <>{children}</>;
}
