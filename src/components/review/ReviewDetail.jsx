import { Box } from '@mui/material';
import TrackRatingCard from './TrackRatingCard';
import ReviewDetailLeft from './ReviewDetailLeft';

function ReviewDetail({ data }) {
  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
      <ReviewDetailLeft data={data} />

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
