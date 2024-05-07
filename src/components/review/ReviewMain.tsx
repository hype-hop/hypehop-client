import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

import BASE_URL from '../../config';
import { AlbumData } from '../../types/albumData';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from './AlbumReviewSummary';

function ReviewMain() {
  const [data, setData] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review`);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container // maxWidth="md"
      sx={{ marginTop: '105px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">최근리뷰 </Typography>
        <Button variant="outlined" sx={{ mb: 0 }}>
          <Link to="/album/review" style={{ textDecoration: 'none', color: 'inherit' }}>
            더보기
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
        }}
      >
        {Array.isArray(data?.reviews) ? (
          data?.reviews.slice(0, 6).map((review) => (
            <Box sx={{ padding: '16px', border: '1px solid rgb(52, 52, 52)', borderRadius: '0px 16px 16px 16px' }}>
              <AlbumCover
                albumId={review.albumId}
                url={review.thumbnail}
                albumTitle={review.albumTitle}
                artists={review.artists}
              />
              <Box width="282px" mt={2}>
                <AlbumReviewSummary review={review} />
              </Box>
            </Box>
          ))
        ) : (
          <>no</>
        )}
      </Box>
    </Container>
  );
}

export default ReviewMain;
