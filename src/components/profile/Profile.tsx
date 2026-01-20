'use client';

import { useEffect, useState } from 'react';
import { Avatar, Box, Tab, Tabs, Typography } from '@mui/material';
import useTabs from '../../hooks/useTab';
import getProfile from '../../api/profile';
import TabPanel from '../common/Tabs/TabPanel';
import Reviews from '../review/Reviews';
import MyInformationPageSkeleton from '../common/skeletons/myInformationPage/MyInformationPageSkeleton';
import NoAlbumReview from '../review/NoAlbumReview';
import { Profile as IProfile } from '../../types/user';

export default function Profile({ userId }: { userId?: string }) {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { currentTab, handleChangeCurrentTab, tabProps } = useTabs('profile-tab');

  const user = profile?.reviews[0].user;

  useEffect(() => {
    (async () => {
      if (userId === undefined) return;
      const res = await getProfile(userId!);

      if (res.success) {
        setProfile(res.data);
      }
    })();
  }, [userId]);

  return profile ? (
    <>
      <Box sx={{ display: 'flex', columnGap: '24px', mb: '40px' }}>
        <Avatar
          src={user?.image}
          sx={{ width: '100px', height: '100px' }}
          slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
        />
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
