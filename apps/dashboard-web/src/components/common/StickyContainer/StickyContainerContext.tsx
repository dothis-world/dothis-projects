'use client';

import clsx from 'clsx';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import useDebounce from '@/hooks/useDebounce';

interface StickyContainerState {
  portalId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
  stickyDivRef: React.RefObject<HTMLDivElement>;
  renderTrigger: boolean;
  setRenderTrigger: React.Dispatch<React.SetStateAction<boolean>>;
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

  /**
   * @renderTrigger - context에서 sticky변화에 따라서 render를 제어하는 state가 없어서 renderTrigger용으로 생성
   * StickyContainer에서 useEffect 디펜던시에 주입할 요소가 필요했음
   */
  const [renderTrigger, setRenderTrigger] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(
    divRef.current?.getBoundingClientRect().width,
  );

  const handleResize = useDebounce(() => {
    const boundary = divRef.current?.getBoundingClientRect();

    if (boundary) {
      setWidth(boundary.width);
    }
  }, 10); // 300ms 딜레이를 가진 debounce 함수

  // useEffect를 사용하여 컴포넌트가 마운트되면 resize 이벤트를 추가하고, 언마운트 시 이벤트를 제거합니다.
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, divRef.current]);

  return (
    <StickyContainerContext.Provider
      value={{
        portalId,
        triggerRef,
        stickyDivRef,

        renderTrigger,
        setRenderTrigger,
      }}
    >
      <div
        className="relative flex w-full flex-col "
        ref={(node) => {
          divRef.current = node;
          if (node) {
            setWidth(node?.getBoundingClientRect().width);
          }
        }}
      >
        <PortalDiv
          ref={stickyDivRef}
          id={portalId}
          $isSticky={!!stickyDivRef.current?.children.length}
          $width={width}
        ></PortalDiv>
        {/* classname을 넘겨주는데, 해당 classnaame을 병합하는 코드 추가필요 */}
        {children}
      </div>
    </StickyContainerContext.Provider>
  );
};

const PortalDiv = styled.div<{
  $width: number | undefined;
  $isSticky: boolean;
}>`
  position: fixed;
  top: 0;

  width: ${({ $width }) => $width && `${$width}px`};
  max-width: inherit;

  border: ${({ $isSticky }) => $isSticky && '1px solid black'};

  z-index: 9999;

  background-color: white;
`;
