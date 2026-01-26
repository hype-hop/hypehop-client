import { Box, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import UnlikeButton from '../UnlikeButton';
import { fetchReviewsCount } from '../../api/reviews';

function ReviewLanding() {
  const reviewLandingBox = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const count = await fetchReviewsCount();
      setCount(count?.total || null);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        margin: { xs: '100px 0px', md: '220px 0px 120px 0px' },
        gap: '140px',
      }}
      ref={reviewLandingBox}
    >
      <Box sx={{ paddingLeft: { xs: '14px', md: '80px' } }}>
        <Typography
          component="div"
          color="grey.main"
          fontSize="50px"
          textAlign="left"
          mb="11px"
          fontWeight="fontWeightMedium"
        >
          지금까지
        </Typography>
        <Box
          sx={{
            display: 'flex',
            columnGap: '14px',
            opacity: count ? 1 : 0,
            animation: count ? 'fadeIn 1s ease-out forwards' : 'none',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
          <Typography fontSize="50px" component="div" fontWeight="fontWeightMedium">
            {count}개의 리뷰가
          </Typography>
          <Typography color="grey.main" fontSize="50px" component="div" fontWeight="fontWeightMedium">
            모였어요.
          </Typography>
        </Box>
      </Box>

      <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '8px' }}>
        <Button sx={{ height: '36px', fontSize: '14px', fontWeight: 'bold' }} variant="contained" href="/album/write">
          작성하기 →
        </Button>

        <UnlikeButton parentRef={reviewLandingBox} />
      </Box>
    </Box>
  );
}
export default ReviewLanding;
