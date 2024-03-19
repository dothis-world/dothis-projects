import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { Route } from 'next';
import Link from 'next/link';
import React from 'react';
import { UrlObject } from 'url';

// DropdownMenuItemProps에 왜 onSelect 가 없는지 모르겠음
interface Props extends DropdownMenu.DropdownMenuItemProps {
  label: string;
  children?: React.ReactNode;
  href?: Route<string> | UrlObject;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
  preventAutoClose?: boolean;
  onSelect?: (event?: React.MouseEvent) => void;
}

const DropdownItem = ({
  label,
  children,
  leftSlot,
  rightSlot,
  href,
  disabled,
  preventAutoClose,
  onSelect,
  ...props
}: Props) => {
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (preventAutoClose) {
      event.preventDefault();
    }
    onSelect?.(event);
  };

  const textItem = (
    <DropdownMenu.Item {...props} {...{ onSelect: handleClick }}>
      <div className="flex flex-1 flex-col select-none cursor-pointer">
        <div
          className={clsx(
            'flex items-center justify-between',
            disabled && 'cursor-not-allowed pointer-events-none',
          )}
        >
          {typeof leftSlot === 'string' ? <div>{leftSlot}</div> : leftSlot}
          <div className="flex items-center">
            <label className={clsx(disabled && 'text-grey500')}>{label}</label>
          </div>
          {typeof rightSlot === 'string' ? <div>{rightSlot}</div> : rightSlot}
        </div>
        {children}
      </div>
    </DropdownMenu.Item>
  );

  if (href) {
    return (
      <Link href={href} className="cursor-pointer">
        {textItem}
      </Link>
    );
  } else {
    return <div>{textItem}</div>;
  }
};

export default DropdownItem;
