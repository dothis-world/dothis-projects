import { useCallback, useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback?: () => void,
  flag?: boolean,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.();
      }
    },
    [callback, ref],
  );

  useEffect(() => {
    if (flag !== false) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [handleClickOutside, flag]);

  return;
};

export default useClickOutside;
