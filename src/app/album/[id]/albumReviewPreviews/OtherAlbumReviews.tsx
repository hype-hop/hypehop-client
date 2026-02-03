'use client';

import { Box, Skeleton } from '@mui/material';
import { Review } from '../../../../types/review';
import NoAlbumView from './NoAlbumView';
import { useAuth } from '../../../../AuthenticationContext';
import AlbumReviewSummary from '../../../../components/review/albumReviewSummary/AlbumReviewSummary';

function OtherAlbumReviews({ reviews, albumId }: { reviews: Review[]; albumId: string }) {
  const { user } = useAuth();
  const userId = user?._id;
  const hasUserReviewed = reviews?.some((review) => review?.user?._id === userId);
  const isNoAlbumView = !user || (reviews && (reviews.length === 0 || !hasUserReviewed));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(3,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4, 1fr)' },
        gap: 2,
        overflowX: { xs: 'auto' },
        maxWidth: { xs: '100%' },
      }}
    >
      {!reviews &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={`reviews-skeleton-${index}`}
            variant="rounded"
            sx={{
              minWidth: '282px',
              maxWidth: '282px',
              height: '183px',
              p: 2,
            }}
          />
        ))}
      {isNoAlbumView && <NoAlbumView albumId={albumId} />}

      {reviews?.length > 0 &&
        reviews?.map((review) => (
          <Box
            key={`album-review-${review._id}`}
            sx={{
              minWidth: '282px',
              maxWidth: '282px',
              border: '1px solid rgb(52, 52, 52)',
              borderRadius: '0px 16px 16px 16px',
              p: 2,
            }}
          >
            <AlbumReviewSummary review={review} />
          </Box>
        ))}
    </Box>
  );
}

export default OtherAlbumReviews;
