'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useStickyContainerContext } from './StickyContainerContext';

interface StickyContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StickyContainer = ({ className, children }: StickyContainerProps) => {
  const { triggerRef, stickyDivRef } =
    useStickyContainerContext('stickyContainer');
  const [isViewportHidden, setIsViewportHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bounding = triggerRef.current?.getBoundingClientRect();
      bounding &&
        setIsViewportHidden(
          bounding.top < 0 || bounding.bottom > window.innerHeight,
        );
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      {isViewportHidden && stickyDivRef.current
        ? createPortal(
            className ? <div className={className}>{children}</div> : children,
            stickyDivRef.current,
          )
        : children}
    </>
  );
};

export default StickyContainer;
