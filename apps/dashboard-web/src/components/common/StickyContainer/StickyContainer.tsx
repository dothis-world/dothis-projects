'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import useOnScreen from '@/hooks/useOnScreen';

import { useStickyContainerContext } from './StickyContainerContext';

interface StickyContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StickyContainer = ({ className, children }: StickyContainerProps) => {
  const { triggerRef, stickyDivRef } =
    useStickyContainerContext('stickyContainer');

  const sticky = !useOnScreen(triggerRef);

  return (
    <>
      {sticky && stickyDivRef.current
        ? createPortal(
            className ? <div className={className}>{children}</div> : children,
            stickyDivRef.current,
          )
        : children}
    </>
  );
};

export default StickyContainer;
