import { Box, Typography } from '@mui/material';
import TrackRatingCard from './TrackRatingCard';
import ReviewDetailLeft from './ReviewDetailLeft';

function ReviewDetail({ data }) {
  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
      <ReviewDetailLeft data={data} />
      <Box
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      >
        <Typography variant="h1" sx={{ textAlign: 'center', mb: '16px' }}>
          트랙별 평점
        </Typography>
        <TrackRatingCard data={data} />
      </Box>
    </Box>
  );
}

export default ReviewDetail;
