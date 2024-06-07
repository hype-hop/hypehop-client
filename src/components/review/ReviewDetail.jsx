import { Box, Typography } from '@mui/material';
import TrackRatingCard from './TrackRatingCard';
import ReviewDetailLeft from './ReviewDetailLeft';
import PlayPreview from '../common/PlayPreview';

function ReviewDetail({ data }) {
  const { bestTrackName, previewUrl } = data.review;

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
      <ReviewDetailLeft data={data} />
      <Box className="preview">
        <Typography>{bestTrackName}</Typography>
        <PlayPreview previewUrl={previewUrl} />
      </Box>
      <Box
        sx={{
          display: { xs: 'grid', sm: 'grid', md: 'block', lg: 'block' },
        }}
      >
        <TrackRatingCard data={data} />
      </Box>
    </Box>
  );
}

export default ReviewDetail;
