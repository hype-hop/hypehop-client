import { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../../AuthenticationContext';
import { MyReview, Review } from '../../types/review';
import ProfileReviewEditHamburger from './ProfileReviewEditHamburger';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from './AlbumReviewSummary';
import AlbumCard from '../album/AlbumCard';

export default function Reviews({
  reviews,
  setRefreshCount,
}: {
  reviews: MyReview[] | Review[];
  setRefreshCount?: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }} gap={2} mt={2}>
      {reviews?.map((review) => <AlbumCard review={review} key={review._id} />)}
    </Box>
  );
}
