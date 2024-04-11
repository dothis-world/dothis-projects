'use client';

import clsx from 'clsx';
import React, { createContext, useContext, useRef } from 'react';

interface StickyContainerState {
  portalId: string;
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

  return (
    <StickyContainerContext.Provider
      value={{ portalId, triggerRef, stickyDivRef }}
    >
      <div ref={triggerRef}></div>
      <div
        className={clsx('sticky top-0', className)}
        ref={stickyDivRef}
        id={portalId}
      ></div>
      {children}
    </StickyContainerContext.Provider>
  );
};
