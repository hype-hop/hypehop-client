import { Button } from '@mui/material';
import { RefObject, useEffect, useState } from 'react';

const INITIAL_POSITION = { x: 450, y: 120 };

function UnlikeButton({ parentRef }: { parentRef: RefObject<HTMLDivElement> }) {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [positionRange, setPositionRange] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (parentRef && parentRef.current) {
      const positionRange = { x: parentRef.current.offsetWidth, y: parentRef.current.offsetHeight };
      setPositionRange(positionRange);
    }
  }, [parentRef, parentRef.current]);

  const setPositionRandomlyInRange = () => {
    setPosition({
      x: Math.floor(Math.random() * positionRange.x),
      y: Math.floor(Math.random() * positionRange.y),
    });
  };

  return (
    <Button
      onMouseOver={setPositionRandomlyInRange}
      sx={{
        position: 'absolute',
        height: '36px',
        backgroundColor: 'transparent',
        right: position.x,
        top: position.y,
        transition: 'right 1.2s, top 1.2s',
        border: '1px solid white',
        whiteSpace: 'nowrap',
        cursor: 'default',
        ':hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      싫어요 ㅜㅜ
    </Button>
  );
}

export default UnlikeButton;
