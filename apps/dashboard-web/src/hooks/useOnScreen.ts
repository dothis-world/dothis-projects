import { useEffect, useMemo, useState } from 'react';

const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting),
      ),
    [ref],
  );

  useEffect(() => {
    if (ref.current === null) throw new Error(`Invalid ref in useOnScreen`);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};

export default useOnScreen;
