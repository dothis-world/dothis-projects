'use client';

import clsx from 'clsx';
import React, { createContext, useContext, useRef, useState } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface StickyContainerState {
  portalId: string;
  sticky: boolean;
  triggerRef: React.RefObject<HTMLDivElement>;
  stickyDivRef: React.RefObject<HTMLDivElement>;
}

const StickyContainerContext = createContext<StickyContainerState | null>(null);

export const useStickyContainerContext = (componentName: string) => {
  const context = useContext(StickyContainerContext);
  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <StickyContainerContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

interface StickyContainerContextProviderProps {
  children: React.ReactNode;
  className?: string;
  portalId?: string;
}

export const StickyContainerContextProvider = ({
  children,
  className,
  portalId = 'sticky-container-portal',
}: StickyContainerContextProviderProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyDivRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState<boolean>(false);
  // const triggerRef = useIntersectionObserver(() => {
  //   setSticky(true);
  // });

  return (
    <StickyContainerContext.Provider
      value={{ portalId, sticky, triggerRef, stickyDivRef }}
    >
      {/* <div ref={triggerRef}></div> */}
      <div
        className={clsx('sticky top-0', className)}
        ref={stickyDivRef}
        id={portalId}
      ></div>
      {children}
    </StickyContainerContext.Provider>
  );
};
