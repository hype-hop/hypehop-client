import { Box } from '@mui/material';
import { Suspense } from 'react';
import { headers } from 'next/headers';

import WriteReview from '../../../../components/review/WriteReview';
import checkUserFromServerComponent from '../../../user/checkUserFromServerComponent';

async function AlbumReviewWritePage() {
  const headersList = await headers();
  const pathname = headersList.get('x-current-path');
  const fullUrl = headersList.get('x-current-url');

  await checkUserFromServerComponent(pathname);
  return (
    <Box className="Album">
      <Suspense>
        <WriteReview />
      </Suspense>
    </Box>
  );
}

export default AlbumReviewWritePage;
