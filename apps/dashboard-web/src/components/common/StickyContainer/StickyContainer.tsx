'use client';

import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal, render } from 'react-dom';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import { useStickyContainerContext } from './StickyContainerContext';
import useScrollDirection from './useScrollDirection';

interface StickyContainerProps {
  children: React.ReactNode;
  componentName: string;
  stickyOrder: number;
  className?: string;
}

/**
 * @추가해야할 작업
 * - Context 중첩해서 사용했을 경우 제대로 작동할지 장담할 수 없는상태
 * - 위에 문제로인해 StickyContext에 대한 고유 네이밍을 부여해야할 수도 있음
 * - sticky 순서에 대한 자유성을 부여 ----- (생각해보니 sticky는 waterfall 형식으로 오로지 순차적으로 작동하는 기능이라 생각 안해도 될듯)
 */

/**
 * @param stickyOrder - sticky가 부여될 순서를 지정한다 (시작 index - 0)
 * @param componentName - componentName을 부여함 (에러 트랙킹 및 추 후 중첩 Context문제 해결을 위한 네이밍) - 똑같은 Context로 중첩되는 구조일때는 이미 가까운 컨슈머에 적용되는 버그가 있음
 */

const StickyContainer = ({
  className,
  children,
  stickyOrder,
  componentName,
}: StickyContainerProps) => {
  const [isSticky, setIsSticky] = useState(false);

  const [topRootMargin, setTopRootMargin] = useState(0);

  const { stickyDivRef, renderTrigger, setRenderTrigger } =
    useStickyContainerContext(`${componentName}-StickyContainer`);

  /**
   * @useEffect
   * stickyOrder Props를 사용해서  stickyDivRef에 적용된 height만큼 rootMargin값을 Set합니다.
   */
  useEffect(() => {
    let currentStickyHeight = 0;

    for (let i = 0; i < stickyOrder; i++) {
      currentStickyHeight += stickyDivRef.current?.children[
        i
      ]?.getBoundingClientRect().height
        ? stickyDivRef.current?.children[i]?.getBoundingClientRect().height
        : 0;
    }

    setTopRootMargin(currentStickyHeight);
  }, [stickyOrder, renderTrigger]);

  useEffect(() => {
    // setRenderTrigger는  StickyContainer 렌더링 trigger용도로 사용했다.
    setRenderTrigger((prev) => !prev);
  }, [isSticky]);

  /**
   * @scrollDirection - isIntersecting 경계선이 겹치는 경우 버그로 인해 생성한 trigger
   *
   */
  const scrollDirection = useScrollDirection();
  const triggerRef = useIntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollDirection === 'up') {
          setIsSticky(false);
        }
        if (!entry.isIntersecting && scrollDirection === 'down') {
          setIsSticky(true);
        }

        /**
         * @title 해당 scrollDirection 대한 조건이 하나는 제거 가능
         * 경계선 예외처리는 한가지 case에만 추가를 하면 되는 문제입니다.
         * 새로고침 시에도 isIntersecting이 아닐경우 자동으로 sticky전환이 필요합니다. (scrollDirection의 defaulValue down으로 설정해서 해결)
         * */
      });
    },
    {
      threshold: 1,
      rootMargin: `-${topRootMargin ?? 0}px 0px 0px 0px`,
    },
  );

  return (
    <React.Fragment>
      {isSticky && stickyDivRef.current
        ? createPortal(
            <div className={className}>{children}</div>,
            stickyDivRef.current,
          )
        : null}

      {/* <div ref={triggerRef as React.RefObject<HTMLDivElement>} />
      {children} */}
      {/* 해당 방법 children의 gap이 존재할 경우 정확하지 않음  */}

      {React.cloneElement(children as React.ReactElement, {
        ref: (node: any) => {
          triggerRef.current = node;
        },
      })}
    </React.Fragment>
  );
};

export default StickyContainer;
