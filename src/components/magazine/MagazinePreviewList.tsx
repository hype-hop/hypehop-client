import { Box } from '@mui/material';
import { useRef } from 'react';
import { Magazine } from './magazine';
import MagazinePreview from './MagazinePreview';
import useDraggable from '../../hooks/useDraggable';
import scrollStyle from '../../utils/scrollStyle';

export default function MagazinePreviewList({ magazinePreviews }: { magazinePreviews: Magazine[] }) {
  const magazinePreviewListRef = useRef<HTMLElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp } = useDraggable(magazinePreviewListRef);
  return (
    <Box
      ref={magazinePreviewListRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      sx={{
        display: 'flex',
        gap: '40px',
        overflowX: 'auto',
        pb: 2,
        ...scrollStyle.web.default,
      }}
    >
      {magazinePreviews.map((magazine, index) => (
        <Box key={index} mb={4}>
          <MagazinePreview title={magazine.title} src={magazine.src} desc={magazine.desc} />
        </Box>
      ))}
    </Box>
  );
}
