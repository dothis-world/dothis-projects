'use client';

import clsx from 'clsx';
import React, { createContext, useContext, useRef, useState } from 'react';

interface FixedContainerState {
  // fixedContent: boolean;
  portalId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
  fixedDivRef: React.RefObject<HTMLDivElement>;
}

const FixedContainerContext = createContext<FixedContainerState | null>(null);

export const useFixedContainerContext = (componentName: string) => {
  const context = useContext(FixedContainerContext);
  if (context === null) {
    throw new Error(
      `${componentName}에 상위 <FixedContainerContextProvider>기 존재하지 않습니다.`,
    );
  }
  return context;
};

interface FixedContainerContextProviderProps {
  children: React.ReactNode;
  className?: string;
  portalId?: string;
}

export const FixedContainerContextProvider = ({
  children,
  className,
  portalId = 'fixed-container-portal',
}: FixedContainerContextProviderProps) => {
  // const [fixedContent, setFixedContent] = useState(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const fixedDivRef = useRef<HTMLDivElement>(null);

  return (
    <FixedContainerContext.Provider
      value={{ portalId, triggerRef, fixedDivRef }}
    >
      <div ref={triggerRef}></div>
      <div
        className={clsx('fixed', className)}
        ref={fixedDivRef}
        id={portalId}
      ></div>
      {children}
    </FixedContainerContext.Provider>
  );
};
