import { useState, useCallback, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const useInfiniteScrolling = (onFetch) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const page = useRef(1);

  const fetchMore = useCallback(async () => {
    if (!hasMoreItems || isFetching || !onFetch) {
      return;
    }

    setIsFetching(true);

    try {
      await onFetch(page.current);
      page.current += 1;
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [hasMoreItems, isFetching, onFetch]);

  const loaderRef = useRef(null);

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: fetchMore,
    options: { rootMargin: '400px' }
  });

  return {
    loaderRef,
    isFetching,
    hasMoreItems,
    setHasMoreItems
  };
};

export default useInfiniteScrolling;
