import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Review } from '../../types/review';
import { deleteReview } from '../../api/reviews';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from '../review/albumReviewSummary/AlbumReviewSummary';
import Warning from '../common/Modal/Warning';
import { useAuth } from '../../AuthenticationContext';
import ReviewEditMenu from './ReviewEditMenu';

interface MyReviewsProps {
  reviews: Review[];
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MyReviews({ reviews, setRefreshCount }: MyReviewsProps) {
  const [toDeleteReviewId, setToDeleteReviewId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const deleteMyReview = async (id: string) => {
    setOpen(false);
    const success = await deleteReview(id);
    if (success) {
      setRefreshCount((count) => count + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
      {reviews?.map((review) => (
        <Box
          key={`my-review-${review._id}`}
          sx={{
            position: 'relative',
            padding: '16px',
            backgroundColor: 'grey.darkest',
            borderRadius: '12px',
            width: { xs: '100%', sm: '282px' },
            minWidth: { xs: '100%', sm: '282px' },
          }}
        >
          {user?._id === review.user._id && (
            <ReviewEditMenu
              reviewId={review._id}
              onDeleteClick={() => {
                setToDeleteReviewId(review._id);
                setOpen(true);
              }}
            />
          )}
          <Box mb="10px">
            <AlbumCover
              reviewId={review._id}
              url={review.thumbnail}
              albumTitle={review.albumName}
              artists={review.artists}
              previewUrl=""
            />
          </Box>
          <AlbumReviewSummary review={review} isMyReview />
        </Box>
      ))}
      <Warning open={open} setOpen={setOpen} handleDelete={() => deleteMyReview(toDeleteReviewId!)} />
    </Box>
  );
}
