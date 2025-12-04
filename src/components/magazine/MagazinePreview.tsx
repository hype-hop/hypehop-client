import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Magazine } from './magazine';

function MagazinePreview({ title, src, desc }: Magazine) {
  return (
    <Box>
      <Box
        mb={2}
        sx={{
          minWidth: { xs: '160px', md: '384px' },
          minHeight: { xs: '100px', md: '200px' },
          position: 'relative',
        }}
      >
        <Image src={src} alt={title} fill />
      </Box>
      <Box>
        <Typography mb={1} fontWeight="bold" component="div">
          {title}
        </Typography>
        <Typography component="div">{desc}</Typography>
      </Box>
    </Box>
  );
}

export default MagazinePreview;
