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
            .map((review) => (
              <Card
                key={`${review._id}-${Math.random()}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  border: '1px solid rgb(52, 52, 52)',
                  borderRadius: '0px 16px 16px 16px',
                  width: '100%',
                  margin: '0 auto',
                  maxWidth: '100%',
                  bgcolor: 'rgb(14, 14, 14)',
                }}
              >
                <AlbumCover
                  reviewId={review._id}
                  url={review.thumbnail}
                  albumTitle={review.albumTitle}
                  artists={review.artists}
                  previewUrl={review?.previewUrl}
                />

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
                        onClick={() =>
                          router.push(`/profile/${review.user._id}`, {
                            scroll: false,
                          })
                        }
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
                          <Typography
                            style={{ cursor: 'pointer' }}
                            onClick={() => router.push(`/profile/${review.user._id}`)}
                          >
                            {review.user.name || review.user.displayName}
                          </Typography>
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
                        <CustomStar readOnly value={review.albumRating} />
                      </Box>
                    </Box>
                  </Box>

                  <Link href={`/album/review/${review._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Box sx={{ height: '74px' }}>
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
                    <Favorite reviewId={review._id} favoriteClickedUsers={review?.isFavorite} />
                    <Link
                      href={`/album/review/${review._id}`}
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
