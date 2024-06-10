import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import BASE_URL from '../config';
import { Review } from '../types/review';
import ReviewsPageSkeleton from '../components/common/skeletons/reviewsPage/ReviewsPageSkeleton';
import AlbumCover from '../components/album/AlbumCover';
import AlbumReviewSummary from '../components/review/AlbumReviewSummary';

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
  const [refreshCount, setRefreshCount] = useState(0);

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
  }, [genre, refreshCount]);

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
    setRefreshCount((count) => count + 1);
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
            <Box
              sx={{
                padding: '16px',
                border: '1px solid rgb(52, 52, 52)',
                borderRadius: '0px 16px 16px 16px',
              }}
            >
              <AlbumCover
                reviewId={review._id}
                url={review.thumbnail}
                albumTitle={review.albumTitle}
                artists={review.artists}
              />
              <Box width="200px" mt={2}>
                <AlbumReviewSummary review={review} />
              </Box>
            </Box>
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
