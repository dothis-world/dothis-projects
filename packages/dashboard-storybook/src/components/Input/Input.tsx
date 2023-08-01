import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input 컴포넌트 상단 영역에 요소가 추가됩니다. */
  label?: string;
  /** Input 컴포넌트 하단 영역에 요소가 추가됩니다. */
  description?: string;
  /** disabled 상태가 됩니다. */
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, description, disabled, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor="input"
            className="inline-block text-sm text-grey700 mb-[0.62rem]"
          >
            {label}
          </label>
        )}
        <input
          id="input"
          type={type}
          className="flex h-12 w-full rounded-lg border border-solid border-grey400 bg-grey00 px-6 py-3 text-[14px] text-grey900 placeholder:text-grey500 focus:outline-none focus:border-primary500 disabled:cursor-not-allowed disabled:bg-grey200"
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {description && (
          <span className="inline-block text-[12px] text-grey400 mt-2">
            {description}
          </span>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
