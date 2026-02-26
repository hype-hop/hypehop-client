import { Button } from '@mui/material';
import { RefObject, useEffect, useRef, useState } from 'react';

const INITIAL_POSITION = { x: 0, y: 0 };

function getRandomPosition(range: number) {
  return Math.random() * 2 * range - range;
}

function UnlikeButton({ parentRef }: { parentRef: RefObject<HTMLDivElement | null> }) {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [positionRange, setPositionRange] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const buttenRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (parentRef && parentRef.current) {
      const positionRange = { x: parentRef.current.offsetWidth / 2, y: parentRef.current.offsetHeight / 2 };
      setPositionRange(positionRange);
    }
  }, [parentRef]);

  const setPositionRandomlyInRange = () => {
    if (!isMouseOver) {
      setIsMouseOver(true);
    }

    setPosition({
      x: getRandomPosition(positionRange.x),
      y: getRandomPosition(positionRange.y),
    });
  };

  useEffect(() => {
    if (buttenRef.current == null) return;

    buttenRef.current.ontransitionend = () => {
      setIsMouseOver(false);
    };
  }, [buttenRef.current]);

  useEffect(() => {
    if (!isMouseOver) {
      setTimeout(() => {
        setPosition(INITIAL_POSITION);
      }, 3000);
    }
  }, [isMouseOver]);

  return (
    <Button
      ref={buttenRef}
      onMouseOver={setPositionRandomlyInRange}
      sx={{
        height: '36px',
        backgroundColor: 'transparent',
        border: '1px solid white',
        whiteSpace: 'nowrap',
        cursor: 'default',
        ':hover': {
          backgroundColor: 'transparent',
        },
        translate: `${position.x}px ${position.y}px`,
        transition: 'translate 1s',
        display: { xs: 'none', md: 'block' },
        color: 'white.main',
      }}
    >
      싫어요 ㅜㅜ
    </Button>
  );
}

export default UnlikeButton;
