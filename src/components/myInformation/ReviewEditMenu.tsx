import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';
import Hamburger from '../../assets/icons/hamburger.svg';
import Edit from '../../assets/icons/edit-review.svg';
import Delete from '../../assets/icons/delete-review.svg';
import { StyledMenu, StyledMenuItem } from '../common/StyledMenu';
import { typography } from '../../constants/themeValue';

interface ReviewEditMenuProps {
  reviewId: string;
  onDeleteClick: () => void;
}

export default function ReviewEditMenu({ reviewId, onDeleteClick }: ReviewEditMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

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
            onDeleteClick();
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
