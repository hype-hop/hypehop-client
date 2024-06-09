import { Box, Link, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyledMenu, StyledMenuItem } from '../common/StyledMenu';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit-review.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete-review.svg';
import { typography } from '../../constants/themeValue';
import { MyReview, Review } from '../../types/review';
import Warning from '../common/Modal/Warning';
import BASE_URL from '../../config';

export default function ProfileReviewEditHamburger({
  review,
  setRefreshCount,
}: {
  review: MyReview | Review;
  setRefreshCount: Dispatch<SetStateAction<number>>;
}) {
  const [toEditReview, setToEditReview] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLDivElement) | null>(null);

  const [openDeleteWarningModal, setOpenDeleteWarningModal] = useState<boolean>(false);

  const deleteMyReview = async (id: string) => {
    try {
      setRefreshCount((count) => count + 1);
      setOpenDeleteWarningModal(false);
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
            setOpenDeleteWarningModal(true);
          }}
        >
          <Delete />
          <Typography fontSize={typography.size.md} ml={2}>
            삭제
          </Typography>
        </StyledMenuItem>
      </StyledMenu>
      <Warning
        open={openDeleteWarningModal}
        setOpen={setOpenDeleteWarningModal}
        handleDelete={() => deleteMyReview(toEditReview!)}
      />
    </>
  );
}
