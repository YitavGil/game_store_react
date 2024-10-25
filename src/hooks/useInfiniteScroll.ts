import { useEffect, useCallback, RefObject } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootRef: RefObject<HTMLElement>;
  threshold?: number;
}

export const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
  rootRef,
  threshold = 0.8,
}: UseInfiniteScrollProps): void => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading && hasMore) {
        onLoadMore();
      }
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const option = {
      root: null,
      rootMargin: '20px',
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.disconnect();
  }, [rootRef, handleObserver, threshold]);
};