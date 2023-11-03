import type { SVGProps } from 'react';

import { colors } from '@/styles/dothisTheme';

export const SvgThumbUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.gray['50']}
    {...props}
  >
    <path d="M1.66667 7.5H4.16667V17.5H1.66667C1.44565 17.5 1.23369 17.4122 1.07741 17.2559C0.921131 17.0996 0.833333 16.8877 0.833333 16.6667V8.33333C0.833333 8.11232 0.921131 7.90036 1.07741 7.74408C1.23369 7.5878 1.44565 7.5 1.66667 7.5ZM6.0775 6.4225L11.4108 1.08917C11.4817 1.01808 11.5759 0.974972 11.676 0.967776C11.7761 0.96058 11.8755 0.989778 11.9558 1.05L12.6667 1.58333C12.8641 1.73154 13.0132 1.93488 13.0952 2.16771C13.1772 2.40055 13.1885 2.65245 13.1275 2.89167L12.1667 6.66667H17.5C17.942 6.66667 18.3659 6.84226 18.6785 7.15482C18.9911 7.46738 19.1667 7.89131 19.1667 8.33333V10.0867C19.1669 10.3045 19.1244 10.5202 19.0417 10.7217L16.4625 16.9842C16.3996 17.1368 16.2927 17.2674 16.1555 17.3592C16.0182 17.4511 15.8568 17.5001 15.6917 17.5H6.66667C6.44565 17.5 6.23369 17.4122 6.07741 17.2559C5.92113 17.0996 5.83333 16.8877 5.83333 16.6667V7.01167C5.83338 6.79067 5.92121 6.57874 6.0775 6.4225Z" />
  </svg>
);
