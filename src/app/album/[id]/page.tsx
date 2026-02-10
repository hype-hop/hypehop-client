'use client';

import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import AlbumReviewPreviews from './albumReviewPreviews/AlbumReviewPreviews';
import AlbumInformation from './albumInformation/AlbumInformation';

function AlbumShowPage() {
  const { id } = useParams();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <AlbumInformation id={id} />

      <AlbumReviewPreviews id={id} />
    </Box>
  );
}

export default AlbumShowPage;
