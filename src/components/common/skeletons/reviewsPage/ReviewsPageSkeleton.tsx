import { Box } from '@mui/material';
import AlbumReviewSummarySkeleton from '../AlbumReviewSummarySkeleton';
import AlbumCoverSkeleton from '../AlbumCoverSkeleton';

export default function ReviewMainSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={`review-skeleton-${index}`}>
          <Box mb={2}>
            <AlbumCoverSkeleton />
          </Box>
          <AlbumReviewSummarySkeleton />
        </Box>
      ))}
    </>
  );
}
