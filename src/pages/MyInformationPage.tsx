import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import { MyInformation } from '../types/myInformation';
import getMyInformation from '../api/myInformation';
import MyReviews from '../components/review/MyReviews';

function MyPage() {
  const [data, setData] = useState<MyInformation | null>(null);
  const navigate = useNavigate();
  const [user] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyInformation();

      if (res.success) {
        setData(res.data);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    navigate(`/login`);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', columnGap: '24px' }}>
        <Avatar src={user?.image} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography variant="h1"> {user?.name} </Typography>
          <Typography>닉네임 변경</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MyPage;
