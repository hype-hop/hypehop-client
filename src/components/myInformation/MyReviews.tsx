import { Box, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MyReview } from '../../types/review';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit-review.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete-review.svg';
import { StyledMenu, StyledMenuItem } from '../common/StyledMenu';
import BASE_URL from '../../config';
import AlbumCover from '../album/AlbumCover';
import AlbumReviewSummary from '../review/AlbumReviewSummary';
import { typography } from '../../constants/themeValue';
import Warning from '../common/Modal/Warning';
import { useAuth } from '../../AuthenticationContext';

interface MyReviewsProps {
  reviews: MyReview[];
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MyReviews({ reviews, setRefreshCount }: MyReviewsProps) {
  const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const [toEditReview, setToEditReview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const user = useAuth();

  const deleteMyReview = async (id: string) => {
    try {
      setRefreshCount((count) => count + 1);
      setOpen(false);
      const response = await fetch(`${BASE_URL}/album/api/review/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} gap={3}>
      {reviews?.map((review) => (
        <Box
          sx={{
            position: 'relative',
            border: '1px solid rgb(52, 52, 52)',
            padding: '16px',
            borderRadius: '0px 16px 16px 16px',
            width: { xs: '100%', sm: '282px' },
            minWidth: { xs: '100%', sm: '282px' },
          }}
        >
          {user[0]._id === review.user ? (
            <>
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
                    setOpen(true);
                  }}
                >
                  <Delete />
                  <Typography fontSize={typography.size.md} ml={2}>
                    삭제
                  </Typography>
                </StyledMenuItem>
              </StyledMenu>
            </>
          ) : null}

          <AlbumCover
            reviewId={review._id}
            url={review.thumbnail}
            albumTitle={review.albumName}
            artists={review.artists}
            previewUrl=""
          />
          <AlbumReviewSummary review={review} isMyReview />
        </Box>
      ))}
      <Warning open={open} setOpen={setOpen} handleDelete={() => deleteMyReview(toEditReview!)} />
    </Box>
  );
}
