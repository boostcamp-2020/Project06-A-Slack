import { useEffect } from 'react';

interface InfiniteScrollProps {
  root?: HTMLElement | null;
  target: HTMLElement | null;
  onIntersect: (a: any) => any;
  threshold?: number;
  rootMargin?: string;
}

export const useInfinteScroll = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: InfiniteScrollProps): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    if (!target) {
      return;
    }

    observer.observe(target);
    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};
