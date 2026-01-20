import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Favorite from '../../common/Favorite';
import CommentIcon from '../../../assets/icons/comment.svg';
import { FavoriteClickedUser } from '../../../types/favorite';

interface ReviewActionsProps {
  reviewId: string;
  isFavorite: FavoriteClickedUser[];
  commentsCount: number;
}

function ReviewActions({ reviewId, isFavorite, commentsCount }: ReviewActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: '8px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1px' }}>
        <Favorite reviewId={reviewId} favoriteClickedUsers={isFavorite} />
        <Typography sx={{ color: 'rgb(168,168,168)' }} component="span">
          ,
        </Typography>
      </Box>
      <Link
        href={`/album/review/${reviewId}`}
        style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '3px' }}>
          <CommentIcon />
          <Typography sx={{ color: 'rgb(168,168,168)', fontSize: '12px' }}>댓글 {commentsCount}개</Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default ReviewActions;
