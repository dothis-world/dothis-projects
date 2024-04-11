'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal, render } from 'react-dom';

import useOnScreen from '@/hooks/useOnScreen';

import { useStickyContainerContext } from './StickyContainerContext';

interface StickyContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StickyContainer = ({ className, children }: StickyContainerProps) => {
  // const { sticky, stickyDivRef } = useStickyContainerContext('stickyContainer');
  // const { triggerRef, stickyDivRef } =
  //   useStickyContainerContext('stickyContainer');
  // const [sticky, setSticky] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { stickyDivRef } = useStickyContainerContext('stickyContainer');

  const sticky = !useOnScreen(triggerRef);

  const render = () => (
    <>
      <div ref={triggerRef}></div>
      <div className={className}>{children}</div>
    </>
  );

  return sticky && stickyDivRef.current
    ? createPortal(render(), stickyDivRef.current)
    : render();
  if (!triggerRef.current) {
    return <>{children}</>;
  }

  console.log('useOnScreen started');

  // return (
  //   <>
  //     {sticky && stickyDivRef.current
  //       ? createPortal(
  //           <div ref={triggerRef} className={className}>
  //             {children}
  //           </div>,
  //           stickyDivRef.current,
  //         )
  //       : children}
  //   </>
  // );
};

export default StickyContainer;
