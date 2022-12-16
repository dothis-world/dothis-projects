'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

// Create a client
const queryClient = new QueryClient();

export default function ClientContext({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
