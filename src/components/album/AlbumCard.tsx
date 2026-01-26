import { Box } from '@mui/material';
import { Review } from '../../types/review';
import AlbumCover from './AlbumCover';
import AlbumReviewSummary from '../review/albumReviewSummary/AlbumReviewSummary';
import ReviewEditMenu from '../myInformation/ReviewEditMenu';

interface AlbumCardProps {
  review: Review;
  isMyReview?: boolean;
  onDelete?: (deletedId: string) => void;
}

function AlbumCard({ review, isMyReview = false, onDelete }: AlbumCardProps) {
  return (
    <Box
      key={`review-${review._id}`}
      sx={{
        display: 'grid',
        padding: '16px',
        backgroundColor: 'grey.darkest',
        borderRadius: '12px',
        rowGap: '10px',
        position: 'relative',
      }}
    >
      {isMyReview && onDelete && <ReviewEditMenu reviewId={review._id} onDelete={onDelete} />}
      <AlbumCover
        reviewId={review._id}
        url={review.thumbnail}
        albumTitle={review.albumTitle}
        artists={review.artists}
        previewUrl={review?.previewUrl}
      />

      <Box sx={{ minWidth: '200px', maxWidth: '100%' }}>
        <AlbumReviewSummary review={review} isMyReview={isMyReview} />
      </Box>
    </Box>
  );
}

export default AlbumCard;
