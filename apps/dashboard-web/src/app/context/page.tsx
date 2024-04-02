'use client';

import {
  arrow as floatingArrow,
  autoUpdate,
  MiddlewareData,
  offset,
  useFloating,
  UseFloatingOptions,
} from '@floating-ui/react-dom';
import React, { useRef } from 'react';

import Comp from '@/components/common/Calendar/Comp';

const Page = () => {
  const arrowRef = useRef<HTMLSpanElement>(null);

  let isArrow = true;

  let placement = 'bottom' as Side;

  let align: 'start' | 'center' | 'end' = 'center';

  let arrowHeight = 15;

  const placementDetail = placement + (align !== 'center' ? '-' + align : '');

  const {
    refs,
    update,
    floatingStyles,
    elements,
    middlewareData,
    isPositioned,
  } = useFloating({
    placement: placementDetail,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      arrowRef && floatingArrow({ element: arrowRef }),
      offset({
        mainAxis: 15,
        crossAxis: 0,
      }),
    ],
  });

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;

  return (
    <div>
      <Comp />
      <div ref={refs.setReference}>테스트</div>
      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
        }}
      >
        {isArrow && (
          <Arrow
            ref={arrowRef}
            placedSide={placement}
            arrowX={arrowX}
            color="#ff0000"
            arrowY={arrowY}
            shouldHideArrow={cannotCenterArrow}
          />
        )}
        테스트용 블록
      </div>
    </div>
  );
};

export default Page;

type PopperContentContextValue = {
  placedSide: Side;
  color: string;

  arrowX?: number;
  arrowY?: number;
  shouldHideArrow: boolean;
};

const Arrow = React.forwardRef<HTMLSpanElement, PopperContentContextValue>(
  ({ placedSide, arrowX, arrowY, shouldHideArrow, color }, ref) => {
    const OPPOSITE_SIDE: Record<Side, Side> = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    };
    const baseSide = OPPOSITE_SIDE[placedSide];

    return (
      <span
        ref={ref}
        style={{
          position: 'absolute',
          left: arrowX,
          top: arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: '',
            right: '0 0',
            bottom: 'center 0',
            left: '100% 0',
          }[placedSide],
          transform: {
            top: 'translateY(100%)',
            right: 'translateY(50%) rotate(90deg) translateX(-50%)',
            bottom: `rotate(180deg)`,
            left: 'translateY(50%) rotate(-90deg) translateX(50%)',
          }[placedSide],
          // visibility: shouldHideArrow ? 'hidden' : undefined,
        }}
      >
        <ArrowTest color={color} />
      </span>
    );
  },
);

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;

type Side = (typeof SIDE_OPTIONS)[number];

const ArrowTest = ({ color }: { color: string }) => {
  return (
    <svg
      width={10}
      height={5}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      fill={color}
    >
      {/* We use their children if they're slotting to replace the whole svg */}
      {<polygon points="0,0 30,0 15,10" />}
    </svg>
  );
};
