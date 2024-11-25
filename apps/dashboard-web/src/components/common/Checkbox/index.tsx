'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, forwardRef, useContext } from 'react';
import type { CSSProp } from 'styled-components';

import * as Style from './style';

type CheckboxContextProps = {
  id: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>;

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
});

const CheckboxContainer = ({
  id,
  isChecked,
  onChange,
  children,
}: CheckboxProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  };

  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
};
// Context

const useCheckboxContext = () => useContext(CheckboxContext);

// useContext hook

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size?: Style.CheckBoxSize;
  disabled?: boolean;
  css?: CSSProp;
}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ $size = 'md', disabled = false, css, ...props }, ref) => {
    const { id, isChecked, onChange } = useCheckboxContext();

    return (
      <Style.CheckBox
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
        $size={$size}
        disabled={disabled}
        $css={css}
        {...props}
        ref={ref}
      />
    );
  },
);

const Label = ({ children, ...props }: PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext();
  return (
    <label htmlFor={id} className="text-grey600 text-[0.875rem]" {...props}>
      {children}
    </label>
  );
};

CheckboxContainer.Checkbox = Checkbox;
CheckboxContainer.Label = Label;

export default CheckboxContainer;
