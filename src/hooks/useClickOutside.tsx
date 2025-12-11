import { RefObject, useEffect } from 'react';

export default function useClickOutside(ref: RefObject<HTMLElement | null>, handler: (_event: MouseEvent) => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handler]);
}
