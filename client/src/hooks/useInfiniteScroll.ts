import { useEffect } from 'react';

interface InfiniteScrollProps {
  root: HTMLElement | null;
  target: HTMLElement | null;
  onIntersect: (a: any) => any;
  threshold: number;
  rootMargin: string;
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
      throw new Error('IntersectionObserver를 지정할 대상이 필요합니다.');
    }

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};
