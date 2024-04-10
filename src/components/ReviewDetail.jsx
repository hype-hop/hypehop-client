import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TrackRatingCard from './TrackRatingCard';
import ReviewDetailLeft from './ReviewDetailLeft';
import BASE_URL from '../config';

function ReviewDetail({ data, albumId }) {
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/${albumId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        setAlbumData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [albumId]);

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
      <ReviewDetailLeft data={data} albumData={albumData} />
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
