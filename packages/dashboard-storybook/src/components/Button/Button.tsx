import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './button.module.css';

interface ButtonProps {
  /**
   Button Style Type (primary, outlined,taxted )
   */
  buttonTheme: 'primary' | 'outlined' | 'taxted';
  /**
   Button 비활성화 유무
   */
  disabled?: boolean;
  /**
   Button 사이즈 (S,M,L)
   */
  size: 'S' | 'M' | 'L';
  /**
    Button 내용
   */
  label: string;
}

/**
 * Primary UI component for user interaction
 */

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { buttonTheme = 'primary', size = 'S', disabled = false, label, ...props },
    ref,
  ) => {
    const rootClassName = clsx(styles.root, styles[buttonTheme], styles[size]);

    return (
      <button
        type="button"
        className={rootClassName}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  },
);

export { Button };
