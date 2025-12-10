import { Box } from '@mui/material';
import { Review } from '../../types/review';
import AlbumCover from './AlbumCover';
import AlbumReviewSummary from '../review/AlbumReviewSummary';

function AlbumCard({ review }: { review: Review }) {
  return (
    <Box
      key={`review-${review._id}`}
      sx={{
        display: 'grid',
        padding: '16px',
        backgroundColor: 'grey.darkest',
        borderRadius: '12px',
      }}
    >
      <AlbumCover
        reviewId={review._id}
        url={review.thumbnail}
        albumTitle={review.albumTitle}
        artists={review.artists}
        previewUrl={review?.previewUrl}
      />
      <Box sx={{ minWidth: '200px', maxWidth: '100%' }} mt={2}>
        <AlbumReviewSummary review={review} />
      </Box>
    </Box>
  );
}

export default AlbumCard;
