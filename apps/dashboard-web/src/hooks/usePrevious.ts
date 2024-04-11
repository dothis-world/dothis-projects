import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  const previousValue = ref.current;

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return previousValue;
};

export default usePrevious;
