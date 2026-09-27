import { useEffect, type RefObject } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [ref, handler]);
}
