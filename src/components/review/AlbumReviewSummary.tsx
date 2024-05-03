import { Avatar, Box, Card, CardActions, CardContent, Rating, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import TimeSincePost from '../album/TimeSincePost';
import Favorite from '../common/Favorite';
import { Review } from '../../types/review';
import { typography } from '../../constants/themeValue';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';

function AlbumReviewSummary({ review, isMyReview = false }: { review: Review; isMyReview?: boolean }) {
  const router = useNavigate();
  const { _id, user, albumRating, title, createdAt, isFavorite, comments, body } = review;

  return (
    <Card
      key={_id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '181px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'none',
        boxShadow: 'none',
      }}
    >
      {/* <Link to={`/album/review/${_id}`} /> */}

      <CardContent sx={{ width: '100%', padding: 0 }}>
        {!isMyReview && (
          <Box
            sx={{
              display: 'flex',
              whiteSpace: 'nowrap',
              columnGap: '7px',
            }}
          >
            <Avatar style={{ width: 40, height: 40 }} src={user.image} alt="user" />
            <Box textAlign="left">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginLeft: '3px',
                  columnGap: '8px',
                }}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{
                    alignContent: 'center',
                    maxWidth: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Link to={`/user/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {user.name || user.displayName}
                  </Link>
                </Typography>

                <Typography
                  color="grey.dark"
                  fontSize="fontSizeSm"
                  fontWeight="fontWeightLight"
                  lineHeight="lineHeightSm"
                  sx={{
                    textAlign: 'left',
                    alignContent: 'center',
                  }}
                >
                  <TimeSincePost createdAt={createdAt} />{' '}
                </Typography>
              </Box>
              <Rating readOnly value={albumRating} />
            </Box>
          </Box>
        )}

        <Box onClick={() => router(`/album/review/${_id}`)}>
          <Typography
            color="white.main"
            fontWeight="bold"
            fontSize="16px"
            component="div"
            mt="12px"
            sx={{
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          <Typography
            color="grey.light"
            fontSize={typography.size.md}
            fontWeight="regular"
            component="div"
            mt="8px"
            sx={{
              display: '-webkit-box',
              textAlign: 'left',
              minHeight: '45px',
              lineHeight: '15px',
              overflow: 'hidden',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {body.replace(/<[^>]+>/g, ' ')}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ width: '100%', mt: '13px', padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '8px',
          }}
        >
          <Favorite reviewId={_id} favoriteClickedUsers={isFavorite} />
          <Link
            to={`/album/review/${_id}`}
            style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1px' }}>
              <CommentIcon />
              <Typography sx={{ color: 'rgb(168,168,168)', fontSize: '12px' }}>댓글 {comments.length}개</Typography>
            </Box>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}

export default AlbumReviewSummary;
