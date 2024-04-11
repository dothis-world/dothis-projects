'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useFixedContainerContext } from './FixedContainerContext';

interface FixedContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FixedContainer = ({ className, children }: FixedContainerProps) => {
  const { triggerRef, fixedDivRef } =
    useFixedContainerContext('FixedContainer');
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
      {isViewportHidden &&
        fixedDivRef.current &&
        createPortal(
          className ? <div className={className}>{children}</div> : children,
          fixedDivRef.current,
        )}
      {children}
    </>
  );

  // return isViewportHidden && fixedDivRef.current
  //   ? createPortal(
  //       className ? <div className={className}>{children}</div> : children,
  //       fixedDivRef.current,
  //     )
  //   : children;
};

export default FixedContainer;
