import type { FirstParameter } from '@dothis/share';
import { ChangeProps } from '@dothis/share';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { pagePath } from '@/constants';
import { useModalStore } from '@/models/Modal';

type Props = FirstParameter<typeof pagePath.user> & {
  onClick?: LinkProps['onClick'];
  children: ReactNode;
};
const UserLink = ChangeProps(Link)(
  ({ userId, children, onClick, ...props }: Props) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      useModalStore.getState().closeAll();
      onClick?.(e);
    };
    return {
      href: pagePath.user({ userId }),
      onClick: handleClick,
      title: '유저 페이지 이동',
      children,
    };
  },
);

export default UserLink;
