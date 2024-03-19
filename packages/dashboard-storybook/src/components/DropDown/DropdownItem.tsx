import clsx from 'clsx';
import type { CSSProperties } from 'react';

import styles from './Dropdown.module.css';

export interface DropdownItemProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const DropdownItem = ({
  children,
  onClose,
  className,
  style,
}: DropdownItemProps) => {
  return (
    <div
      className={clsx(styles['item'], className)}
      style={style}
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
