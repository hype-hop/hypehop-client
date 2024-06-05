import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActions,
  Avatar,
  CircularProgress,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import he from 'he';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';
import TimeSincePost from '../components/album/TimeSincePost';
import Favorite from '../components/common/Favorite';
import BASE_URL from '../config';
import { Review } from '../types/review';
import { typography } from '../constants/themeValue';
import CustomStar from '../components/review/CustomStar';
import ReviewsPageSkeleton from '../components/common/skeletons/reviewsPage/ReviewsPageSkeleton';

interface InitialData {
  totalPage: number;
  reviews: Review[];
}

function ReviewsPage() {
  const [data, setData] = useState<InitialData | null>(null);
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState('all');
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
      const url =
        genre === 'all'
          ? `${BASE_URL}/album/api/review/scroll?page=${page}`
          : `${BASE_URL}/album/api/review/scroll?genre=${genre}&page=${page}`;

      const response = await fetch(url);
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
        setPage(1);
        setTotalPage(initialData.totalPage);
        setAllDataLoaded(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

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
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        loadMoreData();
      }
    };

    const debouncedScrollHandler = debounce(handleScroll, 500);

    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPage, isLoading, allDataLoaded, genre]);

  const handleGenreClick = (genre) => {
    setGenre(genre !== 'all' ? genre : 'all');
  };

  const genreMapping = {
    all: '전체',
    hiphop: '#힙합',
    rnb: '#알앤비',
    rock: '#록',
    electronic: '#일렉트로닉',
    pop: '#팝',
    jazz: '#재즈',
    etc: '#기타',
    // Add other genres
  };

  const renderGenreButtons = () => {
    return Object.keys(genreMapping).map((genreKey) => (
      <Button
        sx={{
          mr: '16px',
          mt: '16px',
          border: '1px solid rgb(152, 72, 255)',
          borderRadius: '16px',
          ':hover': { backgroundColor: 'rgb(152, 72, 255)' },
          backgroundColor: genre === genreKey ? 'rgb(152, 72, 255)' : 'transparent',
        }}
        key={genreKey}
        onClick={() => handleGenreClick(genreKey)}
        variant="outlined"
      >
        {genreMapping[genreKey]}
      </Button>
    ));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">리뷰 더보기 </Typography>
      </Box>

      <Box>{renderGenreButtons()}</Box>
      <Box />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
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

                height: '423px',
                padding: '16px',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'rgb(52,52,52)',
                borderRadius: '0px 16px 16px 16px',
                width: '100%',
                margin: '0 auto',
                maxWidth: '100%',
              }}
            >
              <Link target="_blank" to={`/album/review/${review._id}`}>
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
                  <Box>
                    <Avatar
                      style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                      src={review?.user?.image}
                      alt="user"
                    />
                  </Box>

                  <Box display="grid">
                    <Box display="flex">
                      <Typography
                        variant="body1"
                        sx={{
                          alignContent: 'center',
                          ml: 1,
                          maxWidth: '100px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* <Link to={`/user/${review.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {review.user.name || review.user.displayName}
                      </Link> */}
                        <Typography>{review.user.name || review.user.displayName}</Typography>
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgb(168, 168, 168)',
                          ml: '4px',
                          textAlign: 'left',
                          alignContent: 'center',
                        }}
                      >
                        <TimeSincePost createdAt={review.createdAt} />{' '}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: '4px' }}>
                      <CustomStar edit={false} value={review.albumRating} />
                    </Box>
                  </Box>
                </Box>

                <Link to={`/album/review/${review._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Box sx={{ width: '234px', height: '74px' }}>
                    <Typography
                      color="white.main"
                      fontWeight={typography.weight.bold}
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
                      {he.decode(review.body.replace(/<[^>]+>/g, ' '))}
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
                  <Favorite reviewId={review?._id} favoriteClickedUsers={review?.isFavorite} />
                  <Link
                    to={`/album/review/${review._id}`}
                    style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1px', ml: '9px' }}>
                      <CommentIcon />
                      <Typography color="grey.main" fontSize={typography.size.sm}>
                        댓글 {review.comments.length}개
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          ))
        ) : (
          <ReviewsPageSkeleton />
        )}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
}

export default ReviewsPage;
