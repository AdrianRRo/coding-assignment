import { useEffect, useRef, useCallback } from 'react';

const useIntersectionObserver = ({
  target,
  onIntersect,
  options = {},
  stopAfterIntersect = false,
}) => {
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
          if (stopAfterIntersect) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    [onIntersect, stopAfterIntersect]
  );

  useEffect(() => {
    if (!target?.current || typeof onIntersect !== 'function') {
      return;
    }
    observerRef.current = new IntersectionObserver(handleIntersect, options);

    const elementRef = target.current;
    observerRef.current.observe(elementRef);

    return () => {
      observerRef.current.unobserve(elementRef);
    };
  }, [target, handleIntersect, options, onIntersect]);

  return observerRef.current;
};

export default useIntersectionObserver;
