import type { MutableRefObject } from 'react';
import { useRef } from 'react';

type UseKeywordScollType<T> = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  handleTapScrollX: (target: MutableRefObject<T | null>) => void;
  handleRightScroll: () => void;
  handleLeftScroll: () => void;
};

const useClickScrollX = <T extends HTMLElement>(): UseKeywordScollType<T> => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tapScrollX = useRef<number | undefined>(0);

  // 확장성을 위해 left 프로퍼티의 상수값도 파라미터로 받으려한다.
  function handleTapScrollX(target: MutableRefObject<T | null>) {
    tapScrollX.current = target?.current?.getBoundingClientRect().x;

    containerRef.current?.scrollTo({
      behavior: 'smooth',
      left: containerRef.current?.scrollLeft + tapScrollX.current! - 700,
    });
  }

  function handleRightScroll() {
    containerRef.current?.scrollTo({
      behavior: 'smooth',
      left: containerRef.current?.scrollLeft + 150,
    });
  }

  function handleLeftScroll() {
    containerRef.current?.scrollTo({
      behavior: 'smooth',
      left: containerRef.current?.scrollLeft - 150,
    });
  }

  return {
    containerRef,
    handleTapScrollX,
    handleRightScroll,
    handleLeftScroll,
  };
};

export default useClickScrollX;
