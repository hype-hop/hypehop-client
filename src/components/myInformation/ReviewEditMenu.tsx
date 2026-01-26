import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';
import Hamburger from '../../assets/icons/hamburger.svg';
import Edit from '../../assets/icons/edit-review.svg';
import Delete from '../../assets/icons/delete-review.svg';
import { StyledMenu, StyledMenuItem } from '../common/StyledMenu';
import { typography } from '../../constants/themeValue';
import Warning from '../common/Modal/Warning';
import { deleteReview } from '../../api/reviews';

interface ReviewEditMenuProps {
  reviewId: string;
  onDelete: (deletedId: string) => void;
}

export default function ReviewEditMenu({ reviewId, onDelete }: ReviewEditMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [warningOpen, setWarningOpen] = useState(false);

  const handleDelete = async () => {
    setWarningOpen(false);
    onDelete(reviewId);
    await deleteReview(reviewId);
  };

  return (
    <>
      <Warning open={warningOpen} setOpen={setWarningOpen} handleDelete={handleDelete} />
      <Box
        sx={{
          position: 'absolute',
          zIndex: 10,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          top: '27px',
          right: '27px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Hamburger>열기</Hamburger>
      </Box>
      <StyledMenu width={100} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <Link sx={{ textDecoration: 'none' }} href={`/album/review/edit/${reviewId}`}>
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
            setAnchorEl(null);
            setWarningOpen(true);
          }}
        >
          <Delete />
          <Typography fontSize={typography.size.md} ml={2}>
            삭제
          </Typography>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
