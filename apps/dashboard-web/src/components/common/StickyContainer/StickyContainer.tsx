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

const StickyContainer = ({
  className,
  children,
  stickyOrder,
  componentName,
}: StickyContainerProps) => {
  const [isSticky, setIsSticky] = useState(false);

  const [topRootMargin, setTopRootMargin] = useState(0);

  const {
    stickyDivRef,
    rootMargin,
    setRootMargin,
    renderTrigger,
    setRenderTrigger,
  } = useStickyContainerContext('stickyContainer');

  useEffect(() => {
    let total = 0;
    let stickyHeight = 0;

    for (let i = 0; i < stickyOrder; i++) {
      if (!rootMargin[i]) {
        return;
      }
      total += rootMargin[i]?.getBoundingClientRect().height;
    }

    for (let i = 0; i < stickyOrder; i++) {
      stickyHeight += stickyDivRef?.current?.children[
        i
      ]?.getBoundingClientRect()?.height
        ? stickyDivRef?.current?.children[i]?.getBoundingClientRect()?.height
        : 0;
    }

    // setTopRootMargin(total > stickyHeight ? total : stickyHeight);
    setTopRootMargin(stickyHeight);
  }, [
    rootMargin,
    stickyOrder,
    isSticky,
    renderTrigger,
    stickyDivRef.current?.getBoundingClientRect().height,
    stickyDivRef.current?.children.length,
    stickyDivRef.current,
  ]);

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
      rootMargin: `-${topRootMargin ? topRootMargin : 0}px 0px 0px 0px`,
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

      {/* <div ref={triggerRef as React.RefObject<HTMLDivElement>}></div> */}
      {React.cloneElement(children as React.ReactElement, {
        // 여기서의 sticky order는  순서대로 RootMargin에 주입을 하기위한 목적
        'data-component-name': componentName,
        'data-sticky-order': stickyOrder,
        // component name 을 소지한 이유  StickyContext가 중첩되는 구조가 되었을 때 예방책 (하지만 Context 자체가 똑같은 상속이나,  똑같은 Context로 중첩되는 구조일때는 이미 가까운 프로시져로 적용되는 버그가 있음 )
        // sticky order를 소지한 이유 현재 setRootmargin이 적용되는게 waterfall 형식으로 진행되가지고 문제는 없지만, waterfall에서 벗어난 구조를 가지고 싶을 때 해당 order를 기반으로 순서를 정의해야함
        ref: (node: any) => {
          triggerRef.current = node;

          if (rootMargin.indexOf(node) === -1 && node !== null) {
            // console.log(node?.getAttribute('data-component-name'));
            // console.log(node?.getAttribute('data-sticky-order'));

            const componentName = node.getAttribute('data-component-name');

            const stickyOrder = node.getAttribute('data-sticky-order');

            setRootMargin((prev) => [...prev, node]);
          }
        },
      })}
    </React.Fragment>
  );
};

export default StickyContainer;
