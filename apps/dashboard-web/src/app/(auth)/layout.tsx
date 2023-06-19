import type { NextLayoutProps } from '@dothis/ui/src/types/common';

export default function AuthLayout({ children }: NextLayoutProps) {
  return (
    <div>
      <div>auth</div>
      {children}
    </div>
  );
}
