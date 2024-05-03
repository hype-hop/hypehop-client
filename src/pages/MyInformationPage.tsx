import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Container, Link, Tab, Tabs, Typography } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import { MyInformation } from '../types/myInformation';
import getMyInformation from '../api/myInformation';
import AlbumReviewSummary from '../components/review/AlbumReviewSummary';
import AlbumCover from '../components/album/AlbumCover';

import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';
import { ReactComponent as Edit } from '../assets/icons/edit-review.svg';
import { ReactComponent as Delete } from '../assets/icons/delete-review.svg';
import { StyledMenu, StyledMenuItem } from '../components/common/StyledMenu';
import BASE_URL from '../config';
import { typography } from '../constants/themeValue';
import TabPanel from '../components/common/Tabs/TabPanel';
import useTabs from '../hooks/useTab';

function MyPage() {
  const [data, setData] = useState<MyInformation | null>(null);
  const navigate = useNavigate();
  const [user] = useAuth();
  const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const [toEditReview, setToEditReview] = useState<string | null>(null);
  const { currentTab, handleChangeCurrentTab, tabProps } = useTabs('my-information-tab');

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

  const deleteMyReview = async (id: string) => {
    await fetch(`${BASE_URL}/album/api/review/delete/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', columnGap: '24px', mt: '40px', mb: '40px' }}>
        <Avatar src={user?.image} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography variant="h1"> {user?.name} </Typography>
          <Typography>닉네임 변경</Typography>
        </Box>
      </Box>
      <Tabs value={currentTab} onChange={handleChangeCurrentTab} aria-label="my-information-tabs">
        <Tab label="작성한 리뷰" {...tabProps(0)} />
        <Tab label="좋아요한 리뷰" {...tabProps(1)} />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        {data?.reviews && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
            {data?.reviews.map((review) => (
              <Box
                sx={{
                  position: 'relative',
                  border: '1px solid rgb(52, 52, 52)',
                  padding: '16px',
                  borderRadius: '0px 16px 16px 16px',
                  width: '282px',
                  minWidth: '282px',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 10,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    top: '27px',
                    right: '27px',
                    ':hover': { backgroundColor: 'rgb(126, 126, 126)' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={(e) => {
                    setToEditReview(review._id);
                    setOpenMenu(e.currentTarget);
                  }}
                >
                  <Hamburger>열기</Hamburger>
                </Box>
                <StyledMenu width={100} anchorEl={openMenu} open={Boolean(openMenu)} onClose={() => setOpenMenu(null)}>
                  <Link sx={{ textDecoration: 'none' }} href={`/album/review/edit/${toEditReview}`}>
                    <StyledMenuItem sx={{ height: '30px', padding: '9.75px' }}>
                      <Edit />
                      <Typography fontSize={typography.size.md} ml={2}>
                        수정
                      </Typography>
                    </StyledMenuItem>
                  </Link>
                  <StyledMenuItem
                    sx={{ height: '30px', padding: '9.75px' }}
                    onClick={() => {
                      deleteMyReview(toEditReview!);
                    }}
                  >
                    <Delete />
                    <Typography fontSize={typography.size.md} ml={2}>
                      삭제
                    </Typography>
                  </StyledMenuItem>
                </StyledMenu>
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
      </TabPanel>
    </Container>
  );
}

export default MyPage;
