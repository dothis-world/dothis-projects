import type { UseAnimateNumberProps } from 'lib/hooks/useAnimateNumber';
import { useAnimatedNumber } from 'lib/hooks/useAnimateNumber';
import type { ComponentPropsWithRef } from 'react';
import { useRef } from 'react';

import { thousandsSeparators } from '../../../lib/utils/numberUtils';

type Props = ComponentPropsWithRef<'span'> &
  Partial<
    Omit<UseAnimateNumberProps, 'defaultValue' | 'subscribe' | 'springOpt'>
  > & {
    toFixed?: number;
    comma?: boolean;
    duration?: number;
  };

function AnimatedNumber({
  value = 0,
  comma = false,
  duration = 450,
  toFixed = 0,
  ...props
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useAnimatedNumber({
    value,
    springOpt: {
      duration,
    },
    subscribe: (latest) => {
      const showValue = latest.toFixed(toFixed);
      if (ref.current) {
        ref.current.textContent = comma
          ? thousandsSeparators(showValue)
          : showValue;
      }
    },
  });

  return (
    <span ref={ref} {...props}>
      {comma ? thousandsSeparators(value) : value}
    </span>
  );
}

export default AnimatedNumber;
