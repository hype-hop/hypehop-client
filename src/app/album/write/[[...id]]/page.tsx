import { Box } from '@mui/material';
import { Suspense } from 'react';

import WriteReview from '../../../../components/review/WriteReview';
import checkUserFromServerComponent from '../../../user/checkUserFromServerComponent';

async function AlbumReviewWritePage() {
  await checkUserFromServerComponent();
  return (
    <Box className="Album">
      <Suspense>
        <WriteReview />
      </Suspense>
    </Box>
  );
}

export default AlbumReviewWritePage;
