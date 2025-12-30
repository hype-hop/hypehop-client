import { useState, useCallback, MouseEvent, RefObject } from 'react';

const useDraggable = (scrollerRef: RefObject<HTMLElement | null>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [totalX, setTotalX] = useState(0);

  const preventUnexpectedEffects = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      preventUnexpectedEffects(e);
      setIsDragging(true);
      const x = e.clientX;

      if (scrollerRef.current) {
        setTotalX(x + scrollerRef.current.scrollLeft);
      }
    },
    [scrollerRef],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const scrollLeft = totalX - e.clientX;

      if (scrollerRef.current) {
        // eslint-disable-next-line no-param-reassign
        scrollerRef.current.scrollLeft = scrollLeft;
      }
    },
    [isDragging, totalX, scrollerRef],
  );

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  return { onMouseDown, onMouseMove, onMouseUp };
};

export default useDraggable;
