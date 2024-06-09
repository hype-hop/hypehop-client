import { Box } from '@mui/material';
import React from 'react';
import { MyReview } from '../../types/review';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from '../review/AlbumReviewSummary';
import { useAuth } from '../../AuthenticationContext';
import ProfileReviewEditHamburger from '../review/ProfileReviewEditHamburger';

interface MyReviewsProps {
  reviews: MyReview[];
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MyReviews({ reviews, setRefreshCount }: MyReviewsProps) {
  const user = useAuth();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
      {reviews?.map((review) => (
        <Box
          sx={{
            position: 'relative',
            border: '1px solid rgb(52, 52, 52)',
            padding: '16px',
            borderRadius: '0px 16px 16px 16px',
            width: { xs: '100%', sm: '282px' },
            minWidth: { xs: '100%', sm: '282px' },
          }}
        >
          {user[0]._id === review.user ? (
            <ProfileReviewEditHamburger review={review} setRefreshCount={setRefreshCount} />
          ) : null}

          <AlbumCover
            reviewId={review._id}
            url={review.thumbnail}
            albumTitle={review.albumName}
            artists={review.artists}
          />
          <AlbumReviewSummary review={review} isMyReview />
        </Box>
      ))}
    </Box>
  );
}
