import { Box } from '@mui/material';
import { useRef } from 'react';
import { Magazine } from './magazine';
import MagazinePreview from './MagazinePreview';
import useDraggable from '../../hooks/useDraggable';

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
        scrollbarWidth: 'thin', // Firefox
        scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent', // Firefox (thumb, track)
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
        },
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
