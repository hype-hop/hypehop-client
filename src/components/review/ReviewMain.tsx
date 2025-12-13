import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

import Link from 'next/link';
import BASE_URL from '../../config';
import { AlbumData } from '../../types/albumData';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from './AlbumReviewSummary';
import ReviewMainSkeleton from '../common/skeletons/mainPage/ReviewMainSkeleton';
import MoreButton from '../common/Buttons/MoreButton';
import AlbumCard from '../album/AlbumCard';

function ReviewMain() {
  const [data, setData] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return data ? (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="h1">최근 리뷰</Typography>
        <MoreButton href="/album/review" />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          width: { xs: '100%' },
        }}
      >
        {Array.isArray(data.reviews) ? (
          data.reviews.map((review) => <AlbumCard review={review} key={review._id} />)
        ) : (
          <>no</>
        )}
      </Box>
    </Box>
  ) : (
    <ReviewMainSkeleton />
  );
}

export default ReviewMain;
