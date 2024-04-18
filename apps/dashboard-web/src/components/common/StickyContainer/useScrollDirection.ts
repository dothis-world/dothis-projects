import { useEffect, useRef, useState } from 'react';

import usePrevious from './usePrevious';

const THRESHOLD = 0;

type ScrollDirection = 'up' | 'down';

const useScrollDirection = (): ScrollDirection => {
  /**
   * @defaultValue 기본값을 down으로 지정해서 scroll을 내린상태에서 새로고침 시에도 바로 StickyContext Element가 주입하기위해 설정
   */
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>('down');

  const blocking = useRef(false);

  const prevScrollY = usePrevious(THRESHOLD);

  useEffect(() => {
    prevScrollY.current = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection =
          scrollY > prevScrollY.current ? 'down' : 'up';

        setScrollDirection(newScrollDirection);

        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      blocking.current = false;
    };

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
