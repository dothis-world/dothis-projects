import type { NextLayoutProps } from '@dothis/ui/src/types/common';

export default function AuthLayout({ children }: NextLayoutProps) {
  return (
    <div>
      <div>keyword layout</div>
      {children}
    </div>
  );
}
