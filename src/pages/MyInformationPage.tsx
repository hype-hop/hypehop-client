import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import { MyInformation } from '../types/myInformation';
import getMyInformation from '../api/myInformation';
import AlbumReviewSummary from '../components/review/AlbumReviewSummary';
import AlbumCover from '../components/album/AlbumCover';

function MyPage() {
  const [data, setData] = useState<MyInformation | null>(null);
  const navigate = useNavigate();
  const [user] = useAuth();

  useEffect(() => {
    (async () => {
      const res = await getMyInformation();

      if (res.success) {
        setData(res.data);
      }
    })();
  }, []);

  if (!user) {
    navigate(`/login`);
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', columnGap: '24px', mt: '40px', mb: '40px' }}>
        <Avatar src={user?.image} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography variant="h1"> {user?.name} </Typography>
          <Typography>닉네임 변경</Typography>
        </Box>
      </Box>
      <Box>
        <Typography align="left" fontSize="24px" fontWeight="bold" lineHeight="1" mb="16px">
          내가 작성한 리뷰
        </Typography>
        {data?.reviews && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }} gap={3}>
            {data?.reviews.map((review) => (
              <Box
                sx={{
                  border: '1px solid rgb(52, 52, 52)',
                  padding: '16px',
                  borderRadius: '0px 16px 16px 16px',
                  width: '282px',
                  minWidth: '282px',
                }}
              >
                <AlbumCover
                  albumId={review.albumId}
                  url={review.thumbnail}
                  albumTitle={review.albumName}
                  artists={review.artists}
                />
                <AlbumReviewSummary review={review} isMyReview />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default MyPage;
