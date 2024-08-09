import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

import BASE_URL from '../../config';
import { AlbumData } from '../../types/albumData';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from './AlbumReviewSummary';
import ReviewMainSkeleton from '../common/skeletons/mainPage/ReviewMainSkeleton';

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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ ml: '4px' }} variant="h1">
          최근리뷰{' '}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            mb: 0,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
            },
          }}
        >
          <Link to="/album/review" style={{ textDecoration: 'none', color: 'inherit' }}>
            더보기
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
          width: { xs: '100%' },
        }}
      >
        {Array.isArray(data?.reviews) ? (
          data?.reviews.map((review) => (
            <Box
              sx={{
                padding: '16px',
                border: '1px solid rgb(52, 52, 52)',
                borderRadius: '0px 16px 16px 16px',
              }}
            >
              <AlbumCover
                reviewId={review._id}
                url={review.thumbnail}
                albumTitle={review.albumTitle}
                artists={review.artists}
                previewUrl={review?.previewUrl}
              />
              <Box mt={2}>
                <AlbumReviewSummary review={review} />
              </Box>
            </Box>
          ))
        ) : (
          <>no</>
        )}
      </Box>
    </>
  ) : (
    <ReviewMainSkeleton />
  );
}

export default ReviewMain;
