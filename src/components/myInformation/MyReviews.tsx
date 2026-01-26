import { Box } from '@mui/material';
import { Review } from '../../types/review';
import AlbumCard from '../album/AlbumCard';

interface MyReviewsProps {
  reviews: Review[];
  onDelete: (deletedId: string) => void;
}

export default function MyReviews({ reviews, onDelete }: MyReviewsProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
      {reviews?.map((review) => <AlbumCard key={review._id} review={review} isMyReview onDelete={onDelete} />)}
    </Box>
  );
}
