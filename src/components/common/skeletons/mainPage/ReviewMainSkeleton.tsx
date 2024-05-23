import { Box, Typography } from '@mui/material';
import AlbumReviewSummarySkeleton from '../AlbumReviewSummarySkeleton';
import AlbumCoverSkeleton from '../AlbumCoverSkeleton';

export default function ReviewMainSkeleton() {
  return (
    <>
      <Typography sx={{ ml: '4px' }} variant="h1">
        최근리뷰
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
          width: { xs: '100%' },
          height: { xs: '100%' },
        }}
      >
        {Array.from({ length: 5 }).map(() => (
          <Box>
            <Box mb={2}>
              <AlbumCoverSkeleton />
            </Box>
            <AlbumReviewSummarySkeleton />
          </Box>
        ))}
      </Box>
    </>
  );
}
