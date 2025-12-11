import { Box } from '@mui/material';
import { Suspense } from 'react';

import WriteReview from '../../components/review/WriteReview';
import checkUserFromServerComponent from '../user/checkUserFromServerComponent';

async function AlbumReviewPage() {
  await checkUserFromServerComponent(null);
  return (
    <Box className="Album">
      <Suspense>
        <WriteReview />
      </Suspense>
    </Box>
  );
}

export default AlbumReviewPage;
