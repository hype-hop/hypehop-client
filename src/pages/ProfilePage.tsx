import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Tab, Tabs, Typography } from '@mui/material';
import { Profile } from '../types/user';
import TabPanel from '../components/common/Tabs/TabPanel';
import useTabs from '../hooks/useTab';
import MyInformationPageSkeleton from '../components/common/skeletons/myInformationPage/MyInformationPageSkeleton';
import NoAlbumReview from '../components/review/NoAlbumReview';
import getProfile from '../api/profile';
import Reviews from '../components/review/Reviews';

function ProfilePage() {
  const path = useLocation();
  const userId = path.pathname.split('/')[2];

  const [profile, setProfile] = useState<Profile | null>(null);
  const { currentTab, handleChangeCurrentTab, tabProps } = useTabs('profile-tab');

  const user = profile?.reviews[0].user;

  useEffect(() => {
    (async () => {
      const res = await getProfile(userId);

      if (res.success) {
        setProfile(res.data);
      }
    })();
  }, [userId]);

  return profile ? (
    <>
      <Box sx={{ display: 'flex', columnGap: '24px', mb: '40px' }}>
        <Avatar src={user?.image} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography variant="h1"> {user?.name} </Typography>
        </Box>
      </Box>
      <Tabs value={currentTab} onChange={handleChangeCurrentTab} aria-label="my-information-tabs">
        <Tab label="작성한 리뷰" {...tabProps(0)} />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        {profile?.reviews.length > 0 ? <Reviews reviews={profile?.reviews} /> : <NoAlbumReview />}
      </TabPanel>
    </>
  ) : (
    <MyInformationPageSkeleton />
  );
}

export default ProfilePage;
