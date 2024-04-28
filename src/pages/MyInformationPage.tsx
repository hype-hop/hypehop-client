import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import { MyInformation } from '../types/myInformation';
import getMyInformation from '../api/myInformation';
import MyReview from '../components/review/MyReview';

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
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}>
            {data?.reviews.map((review) => <MyReview review={review} />)}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default MyPage;
