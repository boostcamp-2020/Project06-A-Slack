import { useEffect } from 'react';

const $root = document.getElementById('root') as HTMLElement;
const useOnClickOutside = (ref: React.MutableRefObject<any>, handler: (args: any) => any): void => {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    };

    $root.addEventListener('mousedown', listener);
    $root.addEventListener('touchstart', listener);

    return () => {
      $root.removeEventListener('mousedown', listener);
      $root.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export { useOnClickOutside };
