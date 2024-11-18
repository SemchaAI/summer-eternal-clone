import { useEffect } from 'react';

export const useDebounce = (
  callback: () => void | Promise<void>,
  delay: number,
  deps: unknown[]
): void => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, ...deps]);
};
