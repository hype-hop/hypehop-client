import { Box, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import UnlikeButton from '../UnlikeButton';

function ReviewLanding() {
  const reviewLandingBox = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        margin: '80px 0px',
        gap: '20px',
      }}
      ref={reviewLandingBox}
    >
      <Box sx={{ paddingLeft: { xs: '14px', md: '80px' } }}>
        <Typography color="grey.main" fontSize="50px" textAlign="left">
          지금 까지
        </Typography>
        <Box>
          <Typography fontSize="50px">1320개의 리뷰가</Typography>
          <Typography color="grey.main" fontSize="50px">
            모였어요.
          </Typography>
        </Box>
      </Box>

      <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ height: '36px', fontSize: '14px', fontWeight: 'bold' }} variant="contained" color="primary">
          작성하기 →
        </Button>

        <UnlikeButton parentRef={reviewLandingBox} />
      </Box>
    </Box>
  );
}
export default ReviewLanding;
