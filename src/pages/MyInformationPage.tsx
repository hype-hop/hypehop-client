import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, Box, Tab, Tabs, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import { MyInformation } from '../types/myInformation';
import getMyInformation from '../api/myInformation';
import ChangeName from '../components/common/Modal/ChangeName';
import TabPanel from '../components/common/Tabs/TabPanel';
import useTabs from '../hooks/useTab';
import MyReviews from '../components/myInformation/MyReviews';
import MyInformationPageSkeleton from '../components/common/skeletons/myInformationPage/MyInformationPageSkeleton';

function NoAlbumReview() {
  return (
    <Box mt={2}>
      <Typography mb={2}>작성한 리뷰가 없습니다. 첫 리뷰를 작성해보세요!</Typography>
      <Link to="/album" style={{ textDecoration: 'none' }}>
        <Button
          sx={{
            background: 'rgb(152, 72, 255)',
            borderRadius: '4px',
            height: '32px',
          }}
        >
          작성하러 가기
        </Button>
      </Link>
    </Box>
  );
}

function MyPage() {
  const [data, setData] = useState<MyInformation | null>(null);
  const navigate = useNavigate();
  const [user] = useAuth();
  const { currentTab, handleChangeCurrentTab, tabProps } = useTabs('my-information-tab');
  const [open, setOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await getMyInformation();

      if (res.success) {
        setData(res.data);
      }
    })();
  }, [refreshCount]);

  if (!user) {
    navigate(`/login`);
  }

  return data ? (
    <>
      {open && <ChangeName open={open} setOpen={setOpen} userId={user?._id} />}
      <Box sx={{ display: 'flex', columnGap: '24px', mb: '40px' }}>
        <Avatar src={user?.image} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography variant="h1"> {user?.name} </Typography>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{ padding: '0px' }}
          >
            <Typography textAlign="left">닉네임 변경</Typography>
          </Button>
        </Box>
      </Box>
      <Tabs value={currentTab} onChange={handleChangeCurrentTab} aria-label="my-information-tabs">
        <Tab label="작성한 리뷰" {...tabProps(0)} />
        <Tab label="좋아요한 리뷰" {...tabProps(1)} />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        {data?.reviews.length > 0 ? (
          <MyReviews reviews={data?.reviews} setRefreshCount={setRefreshCount} />
        ) : (
          <NoAlbumReview />
        )}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {data?.favReviews && <MyReviews reviews={data?.favReviews} setRefreshCount={setRefreshCount} />}
      </TabPanel>
    </>
  ) : (
    <MyInformationPageSkeleton />
  );
}

export default MyPage;
