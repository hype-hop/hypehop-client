'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box, CardActions, Avatar, CircularProgress } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import he from 'he';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReviewsPageSkeleton from '../../../components/common/skeletons/reviewsPage/ReviewsPageSkeleton';
import AlbumCover from '../../../components/album/AlbumCover';
import { typography } from '../../../constants/themeValue';
import TimeSincePost from '../../../components/album/TimeSincePost';
import Favorite from '../../../components/common/Favorite';
import CustomStar from '../../../components/review/CustomStar';
import CommentIcon from '../../../assets/icons/comment.svg';
import useGenre from './useGenre';
import usePaginatedReviews from './usePaginatedReviews';
import AlbumCard from '../../../components/album/AlbumCard';

function ReviewsPage() {
  const router = useRouter();

  const { genre, genreButtons } = useGenre();
  const { isLoading, paginatedReviews } = usePaginatedReviews(genre);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">리뷰 더보기 </Typography>
      </Box>

      <Box>{genreButtons()}</Box>
      <Box />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          mt: 2,
        }}
      >
        {Array.isArray(paginatedReviews?.pages) ? (
          paginatedReviews.pages
            .flatMap((page) => page!.reviews)
            .map((review) => <AlbumCard review={review} key={review._id} />)
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
