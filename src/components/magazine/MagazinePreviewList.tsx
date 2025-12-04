import { Box } from '@mui/material';
import { Magazine } from './magazine';
import MagazinePreview from './MagazinePreview';

export default function MagazinePreviewList({ magazinePreviews }: { magazinePreviews: Magazine[] }) {
  return (
    <Box sx={{ display: 'flex', gap: '40px', overflowX: 'auto', pb: 2 }}>
      {magazinePreviews.map((magazine, index) => (
        <Box key={index} mb={4}>
          <MagazinePreview title={magazine.title} src={magazine.src} desc={magazine.desc} />
        </Box>
      ))}
    </Box>
  );
}
