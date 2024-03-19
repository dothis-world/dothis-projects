import clsx from 'clsx';
import type { CSSProperties } from 'react';
import React from 'react';

import styles from './Dropdown.module.css';

export interface DropdownHeaderProps {
  label: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const DropdownHeader = ({
  label,
  // children,
  onClose,
  className,
  style,
}: DropdownHeaderProps) => {
  return (
    <div className={clsx(styles['header'], className)} style={style}>
      <label>{label}</label>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default DropdownHeader;
