import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography, Container, Box, CardActions, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Favorite from '../common/Favorite';
import { typography } from '../../constants/themeValue';
import TimeSincePost from '../album/TimeSincePost';
import BASE_URL from '../../config';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';

function ReviewMain() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container // maxWidth="md"
      sx={{ marginTop: '105px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">최근리뷰 </Typography>
        <Button variant="outlined" sx={{ mb: 0 }}>
          <Link to="/album/review" style={{ textDecoration: 'none', color: 'inherit' }}>
            더보기
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
        }}
      >
        {Array.isArray(data?.reviews) ? (
          data.reviews.slice(0, 6).map((review) => (
            <Card
              key={review._id}
              sx={{
                display: 'flex',
                flexDirection: 'column',

                width: '266px',
                height: '423px',
                padding: '16px',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'rgb(52,52,52)',
                borderRadius: '0px 16px 16px 16px',
              }}
            >
              <Link to={`/album/review/${review._id}`}>
                <CardMedia component="img" width="234px" height="234px" image={review.thumbnail} alt="album cover" />
              </Link>

              <CardContent sx={{ padding: '0' }}>
                <Box
                  sx={{
                    display: 'flex',
                    mt: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Avatar
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                    src={review?.user?.image}
                    alt="user"
                  />

                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      alignContent: 'center',
                      ml: 1,
                      maxWidth: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Link to={`/user/${review.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {review.user.name || review.user.displayName}
                    </Link>
                  </Typography>

                  <Typography
                    color="grey.dark"
                    fontSize="fontSizeSm"
                    fontWeight="fontWeightLight"
                    lineHeight="lineHeightSm"
                    sx={{
                      ml: '4px',
                      textAlign: 'left',
                      alignContent: 'center',
                    }}
                  >
                    <TimeSincePost createdAt={review.createdAt} />{' '}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      ml: 'auto',
                      width: '46px',
                      height: '20px',
                      border: '1px solid rgb(86, 87, 87) ',
                      borderRadius: '67px',
                    }}
                  >
                    <StarIcon fontSize="small" sx={{ color: 'white.main', mt: '1px' }} />
                    <Typography
                      sx={{
                        width: '15.33px',
                        alignContent: 'end',
                        fontSize: '11px',
                        fontWeight: '400',
                      }}
                    >
                      {' '}
                      {review.albumRating % 1 === 0 ? `${review.albumRating}.0` : review.albumRating}
                    </Typography>
                  </Box>
                </Box>
                <Link to={`/album/review/${review._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Box sx={{ width: '234px', height: '74px' }}>
                    <Typography
                      color="white.main"
                      fontWeight="600"
                      fontSize={typography.size.lg}
                      component="div"
                      sx={{
                        textAlign: 'left',
                        mt: '13px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {review.title}
                    </Typography>
                    <Typography
                      color="grey.light"
                      fontSize={typography.size.md}
                      fontWeight={typography.weight.regular}
                      component="div"
                      sx={{
                        textAlign: 'left',
                        mt: '6px',
                        height: '45px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '15px',
                        letterSpacing: '-4%',
                      }}
                    >
                      {review.body.replace(/<[^>]+>/g, ' ')}
                    </Typography>
                  </Box>
                </Link>
              </CardContent>
              <CardActions disableSpacing sx={{ mt: 'auto' }}>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Favorite reviewId={review._id} numberOfFavorite={review.isFavorite.length} />

                  <Link
                    to={`/album/review/${review._id}`}
                    style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '1px',
                        ml: '9px',
                      }}
                    >
                      <CommentIcon />
                      <Typography
                        fontSize={typography.size.md}
                        fontWeight={typography.weight.regular}
                        sx={{ color: 'rgb(168,168,168)' }}
                      >
                        댓글 {review.comments.length}개
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Nothing to display</Typography>
        )}
      </Box>
    </Container>
  );
}

export default ReviewMain;
