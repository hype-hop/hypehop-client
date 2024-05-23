import { Box } from '@mui/material';
import AlbumCoverSkeleton from '../AlbumCoverSkeleton';
import AlbumReviewSummarySkeleton from '../AlbumReviewSummarySkeleton';

export default function MyReviewsSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
      {Array.from({ length: 5 }).map(() => (
        <Box
          sx={{
            border: '1px solid rgb(52, 52, 52)',
            padding: '16px',
            borderRadius: '0px 16px 16px 16px',
            width: '282px',
            minWidth: '282px',
          }}
        >
          <AlbumCoverSkeleton />
          <AlbumReviewSummarySkeleton />
        </Box>
      ))}
    </Box>
  );
}
