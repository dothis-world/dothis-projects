import useClickOutside from '../../hooks/useClickOutside';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import React, { useRef, useState } from 'react';

import styles from './Dropdown.module.css';
import DropdownHeader from './DropdownHeader';
import DropdownItem from './DropdownItem';

export interface DropdownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Dropdown = ({ label, children, className, style }: DropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const addOnCloseToDropdownElements = (
    children: React.ReactNode,
    onClose: () => void,
  ): React.ReactNode[] => {
    const defaultContent: React.ReactNode[] = [];

    return React.Children.toArray(children).reduce<React.ReactNode[]>(
      (acc, child) => {
        if (!React.isValidElement(child)) {
          acc.push(child);
          return acc;
        }

        if (child.type === DropdownHeader || child.type === DropdownItem) {
          const onCloseChild = React.cloneElement(child, {
            ...{
              onClose: () => {
                child.props.onClose?.();
                onClose();
              },
            },
          });
          acc.push(onCloseChild);
        } else if (React.Children.count(child.props.children) > 0) {
          const content = addOnCloseToDropdownElements(
            child.props.children,
            child.props.onClose ?? onClose,
          );
          acc.push(
            React.cloneElement(child, { ...child.props, children: content }),
          );
        } else {
          acc.push(child);
        }
        return acc;
      },
      defaultContent,
    );
  };

  const content = addOnCloseToDropdownElements(children, onClose);

  useClickOutside(divRef, onClose, isOpen);
  return (
    <div
      ref={divRef}
      className={clsx(styles['container'], className)}
      style={style}
    >
      <label onClick={() => setIsOpen(!isOpen)}>{label}</label>
      <div className={clsx(!isOpen && styles['hidden'])}>
        <div className={styles['items']}>{content}</div>
      </div>
    </div>
  );
};

export default Dropdown;
