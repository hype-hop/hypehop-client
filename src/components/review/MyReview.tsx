import { Box, Card, CardActions, CardContent, Rating, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Favorite from '../common/Favorite';
import { MyReview } from '../../types/review';
import AlbumCover from '../album/AlbumCover';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { typography } from '../../constants/themeValue';
import PRECISION from '../../constants/ratingPrecision';

function MyReviews({ review }: { review: MyReview }) {
  const router = useNavigate();
  const { _id, albumId, thumbnail, albumName, albumRating, body, artists, title, comments } = review;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          border: '1px solid rgb(52, 52, 52)',
          borderRadius: '0px 16px 16px 16px',
          padding: '16px',
          columnGap: '24px',
        }}
      >
        <Box>
          <AlbumCover reviewId={albumId} url={thumbnail} previewUrl="" />
        </Box>

        <Card
          key={_id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '181px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: 'none',
            boxShadow: 'none',
          }}
        >
          <Box>
            <Typography fontWeight="bold" fontSize={typography.size.lg} textAlign="left">
              {albumName}
            </Typography>
            {artists?.map((artist) => (
              <Typography color="rgb(182,182,182)" textAlign="left">
                {artist}
              </Typography>
            ))}
          </Box>
          <CardContent sx={{ width: '100%', padding: 0 }}>
            <Box
              sx={{
                display: 'flex',
                whiteSpace: 'nowrap',
                columnGap: '7px',
              }}
            >
              <Box textAlign="left">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: '3px',
                    columnGap: '8px',
                  }}
                />
                <Rating readOnly value={albumRating} precision={PRECISION} />
              </Box>
            </Box>

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
              <Favorite reviewId={_id} favoriteClickedUsers={review?.isFavorite} />
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
      </Box>
    </Box>
  );
}

export default MyReviews;
