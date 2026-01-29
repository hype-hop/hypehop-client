import { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
import { Review } from '../../types/review';
import AlbumCard from '../album/AlbumCard';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }} gap={2} mt={2}>
      {reviews?.map((review) => <AlbumCard review={review} key={review._id} />)}
    </Box>
  );
}
