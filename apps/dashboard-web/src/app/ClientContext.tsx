'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

export default function ClientContext({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </QueryClientProvider>
  );
}

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
