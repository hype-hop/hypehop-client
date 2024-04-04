import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Container, Box, CardActions } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarIcon from '@mui/icons-material/Star';
import TimeSincePost from '../components/TimeSincePost';
import Favorite from '../components/Favorite';
import BASE_URL from '../config';
import { Review } from '../types/review';

interface InitialData {
  totalPage: number;
  reviews: Review[];
}

function ReviewsPage() {
  const [data, setData] = useState<InitialData | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);

  // eslint-disable-next-line no-unused-vars
  function debounce(this: unknown, func: (...args: unknown[]) => void, delay: number): (...args: unknown[]) => void {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout;
    // eslint-disable-next-line func-names
    return function (this: unknown, ...args: unknown[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const fetchData = async (page: number): Promise<InitialData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/album/api/review/scroll?page=${page}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const initialData = await fetchData(1);
      if (initialData) {
        setData(initialData);
        setTotalPage(initialData.totalPage);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadMoreData = async () => {
      if (isLoading || allDataLoaded) return;
      setIsLoading(true);

      const newData = await fetchData(page + 1);

      if (newData && newData.reviews.length > 0) {
        setData((prevData) => ({
          ...prevData!,
          reviews: [...prevData!.reviews, ...newData.reviews],
        }));

        setPage((prevPage) => Math.min(prevPage + 1, newData.totalPage));

        if (page + 1 >= totalPage) {
          setAllDataLoaded(true);
        }
      }

      setIsLoading(false);
    };

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreData();
      }
    };

    const debouncedScrollHandler = debounce(handleScroll, 500);

    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [page, totalPage, isLoading, allDataLoaded]);

  return (
    <Container sx={{ marginTop: '105px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">리뷰 </Typography>
      </Box>

      <Box />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
        }}
      >
        {Array.isArray(data?.reviews) ? (
          data?.reviews.map((review) => (
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
                  <img
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                    src={review.user.image}
                    alt="user"
                  />
                  <Typography
                    color="white.main"
                    fontWeight="fontWeightLight"
                    fontSize="fontSizeMd"
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
                    <StarIcon sx={{ color: 'white.main', fontSize: 'fontSizeMd', mt: '1px' }} />
                    <Typography
                      color="white.main"
                      fontSize="fontSizeSm"
                      fontWeight="fontWeightLight"
                      sx={{
                        width: '15.33px',
                        alignContent: 'end',
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
                      fontWeight="fontWeightRegular"
                      fontSize="fontSizeMd"
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
                      fontSize="fontSizeSm"
                      fontWeight="fontWeightLighter"
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
                      {review.body.replace(/<[^>]+>/g, '')}
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

                  <Box sx={{ display: 'flex' }}>
                    <Link
                      to={`/album/review/${review._id}`}
                      style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
                    >
                      <ChatBubbleOutlineIcon sx={{ color: 'white.main', fontSize: '1em' }} />
                      <Typography color="grey.main" fontSize="fontSizeSm" sx={{ margin: '0px 8px' }}>
                        댓글 {review.comments.length}개
                      </Typography>
                    </Link>
                  </Box>
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

export default ReviewsPage;
